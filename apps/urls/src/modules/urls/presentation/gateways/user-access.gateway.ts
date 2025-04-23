import {
  type AuthenticatedClient,
  WsAuthGuard,
} from '@ez-shortener/auth-guard';
import { ResponseError } from '@ez-shortener/exceptions';
import { Model, Types } from '@ez-shortener/databases/mongoose';
import { InjectModel } from '@ez-shortener/databases/nestjs-mongoose';
import { Inject, Injectable, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  SubscribeMessage,
  WsException,
} from '@nestjs/websockets';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChangeStream } from 'mongodb';
import { Access as AccessSchema } from '../../infrastructure/database/schemas/access.schema';
import { FindAllUserAccessUseCase } from '../../domain/usecases/find-all-user-access.usecase';

@WebSocketGateway({ path: '/ws/access' })
@Injectable()
export class UserAccessGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private changeStreams = new Map<string, ChangeStream>();
  private userSockets = new Map<string, Set<AuthenticatedClient>>();

  constructor(
    @InjectModel(AccessSchema.name)
    private readonly accessModel: Model<AccessSchema>,
    @Inject('FindAllUserAccessUseCase')
    private readonly findAllUserAccessUseCase: FindAllUserAccessUseCase,
  ) {}

  async handleConnection() {}

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('init')
  async init(@ConnectedSocket() client: AuthenticatedClient) {
    const { id } = client.user;
    this.addSocketToUser(id, client);
    this.watchAccessCollection(id);
    await this.emitCurrentUserAccess(id, client);
  }

  handleDisconnect(client: AuthenticatedClient) {
    try {
      const { id } = client.user;
      if (id) this.removeSocketFromUser(id, client);
    } catch (err) {
      if (err instanceof WsException) {
        throw new WsException(err.message);
      } else {
        throw new ResponseError(500, '', 'INTERNAL_SERVER_ERROR');
      }
    }
  }

  private async emitCurrentUserAccess(
    userId: string,
    socket: AuthenticatedClient,
  ) {
    try {
      const accessData = await this.findAllUserAccessUseCase.execute(userId);
      socket.emit('userAccessUpdated', { access: accessData });
    } catch (err) {
      if (err instanceof WsException) {
        throw new WsException(err.message);
      } else {
        throw new ResponseError(500, '', 'INTERNAL_SERVER_ERROR');
      }
    }
  }

  private watchAccessCollection(userId: string) {
    try {
      if (this.changeStreams.has(userId)) return;
      const pipeline = [
        {
          $match: {
            'fullDocument.owner': new Types.ObjectId(userId),
          },
        },
      ];
      const changeStream = this.accessModel.watch(pipeline);
      const handleChange = () => {
        void this.handleChangeAsync(userId);
      };
      changeStream.on('change', handleChange);
      this.changeStreams.set(userId, changeStream);
    } catch (err) {
      if (err instanceof WsException) {
        throw new WsException(err.message);
      } else {
        throw new ResponseError(500, '', 'INTERNAL_SERVER_ERROR');
      }
    }
  }

  private async handleChangeAsync(userId: string) {
    const sockets = this.userSockets.get(userId);
    if (!sockets) return;
    const foundUserAccess = await this.findAllUserAccessUseCase.execute(userId);
    for (const socket of sockets) {
      socket.emit('userAccessUpdated', { access: foundUserAccess });
    }
  }

  private addSocketToUser(userId: string, socket: AuthenticatedClient) {
    if (!this.userSockets.has(userId)) {
      this.userSockets.set(userId, new Set());
    }
    this.userSockets.get(userId)!.add(socket);
  }

  private removeSocketFromUser(userId: string, socket: AuthenticatedClient) {
    const sockets = this.userSockets.get(userId);
    if (!sockets) return;
    sockets.delete(socket);
    if (sockets.size === 0) {
      this.userSockets.delete(userId);
      const stream = this.changeStreams.get(userId);
      void stream?.close();
      this.changeStreams.delete(userId);
    }
  }
}

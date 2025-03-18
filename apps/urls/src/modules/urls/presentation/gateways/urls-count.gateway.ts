import { Model } from '@ez-shortener/databases/mongoose';
import { InjectModel } from '@ez-shortener/databases/nestjs-mongoose';
import { Inject, Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { ChangeStream } from 'mongodb';
import { Url as UrlSchema } from '../../infrastructure/schemas/url.schema';
import { CountUrlsUseCase } from '../../domain/use-cases/count-urls.usecase';

@WebSocketGateway()
@Injectable()
export class UrlsCountGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  private changeStream: ChangeStream;

  constructor(
    @InjectModel(UrlSchema.name) private readonly urlModel: Model<any>,
    @Inject('CountUrlsUseCase')
    private readonly countUrlsUseCase: CountUrlsUseCase,
  ) {}

  onModuleInit() {
    this.watchUrlCollection();
  }

  async handleConnection() {
    await this.emitCurrentUrlsCount();
  }

  async handleDisconnect() {
    if (this.changeStream) {
      await this.changeStream.close();
    }
  }

  private async emitCurrentUrlsCount() {
    const { count } = await this.countUrlsUseCase.execute();
    this.server.emit('urlsCountUpdated', { count });
  }

  private watchUrlCollection() {
    this.changeStream = this.urlModel.collection.watch();
    this.changeStream.on('change', () => {
      void this.emitCurrentUrlsCount();
    });
  }
}

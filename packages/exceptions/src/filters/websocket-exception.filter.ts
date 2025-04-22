import { Catch, ArgumentsHost, WsExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ResponseError } from '../common';

@Catch(WsException)
export class WebsocketExceptionFilter implements WsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient<Socket>();
    const statusCode = 400;
    const message = exception.message || 'WebSocket error';
    const error = 'BAD_REQUEST';
    const responseError = new ResponseError(statusCode, message, error);
    client.emit('error', responseError);
  }
}

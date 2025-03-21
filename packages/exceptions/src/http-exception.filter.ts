import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

export type ResponseError = {
  statusCode: number;
  message: string;
  error: string;
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const message = exception.message;
    const error = HttpStatus[statusCode] || 'Unknown Error';
    const responseError: ResponseError = {
      statusCode,
      message,
      error,
    };
    response.status(statusCode).json(responseError);
  }
}

import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception.getStatus) {
      status = exception.getStatus();
    }
    Logger.error(
      `${request.method} ${status} ${request.url} \n${exception.stack}\n`,
      'ExceptionFilter',
    );
    return response.status(status).json({
      code: status,
      payload:
        status === HttpStatus.INTERNAL_SERVER_ERROR
          ? 'Something went wrong'
          : exception.message,
      error: true,
      url: request.url,
      method: request.method,
    });
  }
}

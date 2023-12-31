import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const { method } = req;
    const { url } = req;

    return next.handle().pipe(
      tap(() => {
        Logger.log(
          `${method} ${res.statusCode} ${url} ${Date.now() - now}ms`,
          `${context.getClass().name}`,
        );
      }),
    );
  }
}

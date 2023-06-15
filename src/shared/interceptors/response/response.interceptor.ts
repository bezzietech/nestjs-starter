import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const currentTime = Date.now();
    const method = req.method;
    const url = req.url;
    return next.handle().pipe(
      map((data) => {
        return {
          code: res.statusCode,
          data,
          error: false,
          timeTaken: `${Date.now() - currentTime}ms`,
          url,
          method,
        };
      }),
    );
  }
}

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  constructor(private readonly dtoClass: any) {}

  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return plainToInstance(this.dtoClass, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}

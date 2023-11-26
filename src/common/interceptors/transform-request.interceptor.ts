import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';

export class TransformRequestInterceptor implements NestInterceptor {
  constructor(private readonly dtoClass: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { body } = request;

    request.body = plainToInstance(this.dtoClass, body, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    });

    return next.handle();
  }
}

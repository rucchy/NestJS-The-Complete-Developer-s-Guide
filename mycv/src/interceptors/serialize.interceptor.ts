import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';

interface ClassConstructor {
  new (...arg: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerilizeInterceptor(dto));
}

export class SerilizeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    //Run something before the request is handled by the request handler

    return next.handle().pipe(
      map((data: any) => {
        //Run something before the response is sent out
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true
        });
      })
    );
  }
}

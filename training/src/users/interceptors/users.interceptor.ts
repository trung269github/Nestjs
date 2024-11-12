import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class UsersInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, 
        next: CallHandler,
    ): Observable<any> | Promise<Observable<any>> {
        console.log(context.getClass().name);
        return next.handle();
    }
}
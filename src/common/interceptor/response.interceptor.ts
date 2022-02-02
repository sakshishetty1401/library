import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

/**
 * Interceptor
 */
 @Injectable()
 export class ResponseInterceptor implements NestInterceptor{
 
     /**
      * Interseptor
      * @param context 
      * @param next 
      * @returns data, statuscode, response
      */
     intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
         //console.log("in interceptor" )
         let statusCode = context.switchToHttp().getResponse().statusCode;
         let response = next.handle().pipe(map(data=> {
             return {
                 data,
                 statusCode
             }
         }))
         return response
     }
 
 }
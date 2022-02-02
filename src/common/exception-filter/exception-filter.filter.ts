import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';
import { ReadableStreamBYOBReader } from "stream/web";

/**
 * Used to handled all the exceptions
 */
@Catch()
export class ExceptionExceptionFilter implements ExceptionFilter {

  /**
   * Exception Filter
   * @param exception 
   * @param host 
   * @returns statusCode,url,time
   */
  catch(exception: any, host: ArgumentsHost) {
    let cxt = host.switchToHttp();
    let request = cxt.getRequest<Request>()
    let response = cxt.getResponse<Response>();
    let status = exception.getStatus();
    
    return response.status(status).json({
      statusCode: status,
      data: null,
      message: exception?.response,
      url: request.url,
      time: new Date().toISOString()
    });



  }
}
 
 
 
  
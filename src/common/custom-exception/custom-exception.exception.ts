import { HttpException, HttpStatus } from "@nestjs/common";

/**
 * User-defined exception
 */
 export class CustomException extends HttpException{
    /**
     * User-defined exception
     * @param message Httpstatus for 404
     */
    constructor(message){
       super(message, HttpStatus.NOT_FOUND) 
    }
}
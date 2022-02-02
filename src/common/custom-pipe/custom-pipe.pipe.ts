import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common"


/**
 * Used for typeconversion
 */

 @Injectable()
 export class CustomPipe implements PipeTransform{
 
     /**
      * used for typeconversion parseInt
      * @param value 
      * @param metadata 
      * @returns fmtValue 
      */
     transform(value: any, metadata: ArgumentMetadata) {
         console.log("__________", typeof(value),value)
         let fmtValue = parseInt(value)
         console.log("__________", typeof(fmtValue),fmtValue)
         return fmtValue
     }
 
 }
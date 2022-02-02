import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Orders } from "../orders/dto/orders.entity";

import { Stocks } from "../stocks/stocks.entity";
import { Role } from "./role.enum";

/**
 * User dto class
 */
export class UserDTO {

    /**
     * @type:number
     * accepts the integer value
     */
    id: number;

    /**
     * @type : string
     * accepts the string value
     */
    @IsNotEmpty({ message: 'User Name is not empty' })
    @IsString()
    userName: string;

    /**
     * @type : string
     * accepts the string value
     */
    @IsNotEmpty({ message: 'Email cant be empty' })
    @IsEmail({ contains: '@hcl.com' })
    emailId: string;


    /**
     * @type:string
     * accepts the string value
     */
    @IsNotEmpty({ message: 'Password cant be empty' })
    @IsString()
    password: string;

    /**
     * @type : number
     * accepts the interger value
     */
    @IsNotEmpty({ message: 'Phonenumber cant be empty' })
    @IsNumber()
    phoneNumber: number;


    /**
     * @type:string
     * accepts the string value
     */
    @IsNotEmpty({ message: 'PanNo cant be empty' })
    @IsString()
    panNo: string;
    
    /**
     * @type : number
     * accepts the interger value
     */
    @IsNotEmpty({ message: 'AccountNO cant be empty' })
    @IsNumber()
    accountNo: number;



    // /**
    //  * Stocks column for store users id in the tabel
    //  */
    //  stocks: Stocks[]

     /**
      * Stocks column for store users id in the tabel
      */
     orders:Orders[];



}



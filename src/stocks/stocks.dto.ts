import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Orders } from "../orders/dto/orders.entity";
import { User } from "../user/user.entity";


/**
 * User dto class
 */
export class StocksDTO {

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
    name: string;

    /**
     * @type : number
     * accepts the number value
     */
    @IsNotEmpty({ message: 'CurrentPrice cant be empty' })
    currentPrice: number;


    /**
     * @type:string
     * accepts the string value
     */
    @IsNotEmpty({ message: 'QOQ cant be empty' })
    @IsString()
    QOQ: string;

    /**
     * @type : number
     * accepts the interger value
     */
    @IsNotEmpty({ message: 'quantity cant be empty' })
    @IsNumber()
    quantity: number;


    /**
     * @type : number
     * accepts the interger value
     */
    @IsNotEmpty({ message: 'open cant be empty' })
    @IsNumber()
    open: number;

    /**
     * @type : number
     * accepts the interger value
     */
    @IsNotEmpty({ message: 'close cant be empty' })
    @IsNumber()
    close: number;

    /**
     * @type : number
     * accepts the interger value
     */
    @IsNotEmpty({ message: 'Sevendays cant be empty' })
    @IsNumber()
    sevenDays: number;

    /**
     * @type : number
     * accepts the interger value
     */
    @IsNotEmpty({ message: 'Forteendays cant be empty' })
    @IsNumber()
    forteenDays: number



    /**
     * User column for store stocks id in the tabel
     */
    orders: Orders[];


}


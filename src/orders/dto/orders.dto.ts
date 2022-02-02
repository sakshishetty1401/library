import { IsNotEmpty, IsNumber } from 'class-validator';
import { Stocks } from '../../stocks/stocks.entity';
import { User } from '../../user/user.entity';

/**
 * Order DTO
 */
export class OrdersDTO {
    /**
     * accepts numbric value
     * @type number
     */
    id: number;

    /**
     * accepts numbric value
     * @type number
     */
    @IsNotEmpty({ message: 'Price cant be empty' })
    @IsNumber()
    price: number;

    /**
     * accepts numbric value
     * @type number
     */
    @IsNotEmpty({ message: 'Quantity cant be empty' })
    @IsNumber()
    quantity: number;

    /**
     * accepts integer value
     * @type number
     */
    @IsNotEmpty({ message: 'charges cant be empty' })
    @IsNumber()
    charges: number;
    
    /**
     * accepts the date
     */
    //@IsNotEmpty()
    date:Date;
    
    /**
     * Relation between user and orders
     */
     @IsNotEmpty({ message: 'user cant be empty' })
    user:User;

      
    /**
     * Relation between user and orders
     */
     @IsNotEmpty({ message: 'stocks cant be empty' })
     stocks:Stocks;

}

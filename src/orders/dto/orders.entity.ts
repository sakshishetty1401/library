import { User } from "../../user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Stocks } from "../../stocks/stocks.entity";

/**
 * Entity class
 */
@Entity()
export class Orders {

    /**
     * take numeric value default
     * @type number
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * accepts numeric
     * @type number
     */
    @Column()
    price: number;

    /**
     * accepts numeric
     * @type number
     */
    @Column()
    quantity: number;

    /**
     * accepts numeric
     * @type number
     */
    @Column()
    charges: number;
    
    /**
     * accepts the date value
     */
    @CreateDateColumn()
    date: Date;

    /**
     * Relation between user and orders
     */
     @ManyToOne(() => User, (user) => user.orders)
     user: User;
     
     /**
      * Relation between stocks and orders
      */
     @ManyToOne(() => Stocks, (stocks) => stocks.orders)
     stocks: Stocks;
    
}
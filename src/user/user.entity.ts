
import { Stocks } from "../stocks/stocks.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "../orders/dto/orders.entity";

/**
 * user entity class
 */
@Entity()
export class User {
    /**
     * @type : number
     * primary key and its auto generated by database
     */
    @PrimaryGeneratedColumn()
    id: number;

    /**
     * @type:string
     * accepts the string value
     */
    @Column()
    userName: string;

    /**
     * @type:string
     * accepts the string value
     */
    @Column({ unique: true })
    emailId: string;

    /**
     * @type:string
     * accepts the string value
     */
    @Column()
    password: string;

    /**
     * @type:number
     * accepts the integer value
     */
    @Column("uuid")
    phoneNumber: number;


    /**
     * @type:string
     * accepts the string value
     */
    @Column("uuid")
    panNo: string;


    /**
     * @type:integer
     * accepts the integer value
     */
    @Column("uuid")
    accountNo: number;

    //  /**
    //   * Relation between books and user
    //   */
    //   @OneToMany(() => Stocks, stocks => stocks.user)
    //   stocks: Stocks[]
      
      /**
       * Relation between books and order
       */
      @OneToMany(() => Orders, (orders) => orders.user)
      orders: Orders[];
 }
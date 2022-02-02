import { EntityRepository, Like, Repository } from "typeorm";
import { StocksDTO } from "./stocks.dto";
import { Stocks } from "./stocks.entity";

/**
 * used to connect with database using typeORM
 */
@EntityRepository(Stocks)
 export class StocksRepository extends Repository<Stocks>{
     
    /**
     * searching the name
     * @param name 
     * @returns 
     */
     searchByStocksName(name:string):Promise<StocksDTO[]>{
        return this.find({select:['id','name','QOQ','currentPrice','quantity'],where:{'name' : Like(`${name}`)}})
     }
 }



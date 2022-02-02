import { EntityRepository, Repository } from "typeorm";
import { Orders } from "./dto/orders.entity";

/**
 * used to connect with database using typeORM
 */
@EntityRepository(Orders)
export class OrdersRepository extends Repository<Orders>{
    
}
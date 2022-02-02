import { Injectable, Logger, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { OrdersDTO } from './dto/orders.dto';
import { Orders } from './dto/orders.entity';
import { OrdersRepository } from './Orders.repository';

/**
 * It will insert/update/delete/retrieve stocks information in the database/repository
 */
@Injectable()
export class OrdersService {

    /**
     * logger for debugging
     */
    logger = new Logger(OrdersService.name);

    /**
     * Dependency Injection
     * @param orderRepo orderRepo
     */
    constructor(private ordersRepo: OrdersRepository) { }

    /**
     * Placing an order
     * @param orders orders
     * @returns success or failure
     */
    async placeOrder(orders: OrdersDTO): Promise<OrdersDTO[]> {
        try {
            let response = await this.ordersRepo.save(orders)
            if (response) {
                const msg: any = `Order placed successful with id : ${response.id}`
                this.logger.log(msg)
                return msg
            } else {
                const msg: string = 'Failed to place Order'
                this.logger.error(msg)
                throw new NotFoundException(msg)
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}

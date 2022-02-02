import { ApiOkResponse, ApiTags, ApiInternalServerErrorResponse, ApiBasicAuth } from '@nestjs/swagger';
import { Body, Controller, Logger, Post, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { OrdersDTO } from './dto/orders.dto';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';

/**
 * Orders Controller includes handler fro CRUD operation
 * @author : sakshi shetty
 */

@ApiBasicAuth('swagger-auth')
@ApiTags('Orders')
@UseGuards(JwtAuthGuard)
@ApiTags('orders controller')
@Controller('orders')
export class OrdersController {
    
    /**
     * logger used for debugging
     */
    logger = new Logger(OrdersController.name);

    /**
     * Dependency Injection
     * @param ordersService orderService
     */
    constructor(private ordersService: OrdersService) { }

    /**
     * placing order
     * @param orders Orderrepo
     * @returns success or failure
     */
    @ApiOkResponse({ description: 'Order Placed successful', status: HttpStatus.OK })
    @ApiInternalServerErrorResponse({ description: 'failed post orders', status: HttpStatus.INTERNAL_SERVER_ERROR })
    @Post()
    placeOrder(@Body() orders: OrdersDTO): Promise<OrdersDTO[]> {
        return this.ordersService.placeOrder(orders);
    }
}

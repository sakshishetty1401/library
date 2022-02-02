import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { OrdersDTO } from './dto/orders.dto';
import { Orders } from './dto/orders.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

const orders: any = {
    id: 1,
    price: 7000,
    quantity: 3,
    stockName: "Star bucks",
    user: 3,
    stocks: 2
}

const orderImportDTO = plainToInstance(OrdersDTO, orders)
describe('OrdersController', () => {
    let ordersController: OrdersController;
    let ordersService: OrdersService;
    let ordersRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrdersController],
            providers: [OrdersService, {
                provide: OrdersService,
                useFactory: () => ({
                    placeOrder: jest.fn()
                })
            }]
        }).compile();

        ordersController = module.get<OrdersController>(OrdersController);
        ordersService = module.get<OrdersService>(OrdersService);
    });

    it('should be defined', () => {
        expect(ordersController).toBeDefined();
    });
    describe('When placeOrder()', () => {
        it('should return response', async () => {
            let findOneSpy = jest.spyOn(ordersService, 'placeOrder').mockResolvedValue(orders);
            let response = await ordersController.placeOrder(orders);
            expect(response).toEqual(orders);
            expect(findOneSpy).toHaveBeenCalled()
        })
    })
});

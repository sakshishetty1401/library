import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { OrdersDTO } from './dto/orders.dto';
import { Orders } from './dto/orders.entity';
import { OrdersRepository } from './Orders.repository';
import { OrdersService } from './orders.service';

const orders: any = [{
  id: 1,
  price: 7000,
  quantity: 3,
  stockName: "Star bucks",
  user: 3,
  stocks: 2
}]
//const orderImportDTO = plainToInstance(OrdersDTO, orders)
describe('OrdersService', () => {
  let orderService: OrdersService;
  let ordersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: JwtService,
        useFactory: () => ({
          sign: jest.fn()
        })
      }, OrdersService, {
        provide: OrdersRepository,
        useFactory: () => ({
          find: jest.fn(),
          save: jest.fn(),
          create: jest.fn()
        })
      }],
    }).compile();

    orderService = module.get<OrdersService>(OrdersService);
    ordersRepository = module.get<OrdersRepository>(OrdersRepository);
  });

  it('should be defined', () => {
    expect(orderService).toBeDefined();
  });

  describe('When placeOrder()', () => {
    describe("AND success", () => {
      it("should return response", async () => {
        const msg = `Order placed successful with id : ${orders.id}`
        let saveOneSpy = jest.spyOn(ordersRepository, 'save').mockResolvedValue(orders)
        let response = await orderService.placeOrder(orders as OrdersDTO)
        expect(response).toEqual(msg);
        expect(saveOneSpy).toHaveBeenCalled();

      })

    })

    describe("AND Failed", () => {
      it("should return response", async () => {
        let saveError = jest.spyOn(ordersRepository, 'save').mockRejectedValue(new Error('Some internal server error'))
        let response = await orderService.placeOrder(orders);
        expect(response).rejects.toThrow(HttpException);
        expect(saveError).toHaveBeenCalled();

      })

    })

  })
});

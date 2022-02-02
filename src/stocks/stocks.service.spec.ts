import { StocksRepository } from './stocks.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { StocksService } from './stocks.service';
import { HttpException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { StocksDTO } from './stocks.dto';

const stocksData: any = {
  id: 1,
  name: "HCL",
  currentPrice: 1200,
  QOQ: "6%",
  quantity: 32,
  open: 100,
  close: 1000,
  sevenDays: 1100,
  forteenDays: 1200
}
describe('StocksService', () => {
  let stocksService: StocksService;
  let stocksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide:JwtService,
        useFactory:()=>({
          sign:jest.fn()
        })
      },UserService,{
        provide: UserRepository,
        useFactory: () => ({
          find: jest.fn(),
          save: jest.fn(),
          create: jest.fn()
        }),},
        StocksService,{
        provide: StocksRepository,
        useFactory: () => ({
          find: jest.fn(),
          save: jest.fn(),
          create: jest.fn()
        })
      }],
    }).compile();

    stocksService = module.get<StocksService>(StocksService);
    stocksRepository = module.get<StocksRepository>(StocksRepository);
  });

  it('should be defined', () => {
    expect(stocksService).toBeDefined();
  });

  describe('When addNewStocks()', () => {
    describe("AND success", () => {
      it("should return response", async () => {
        const msg = `Stocks added Successfully with id${stocksData.id}`
        let saveOneSpy = jest.spyOn(stocksRepository, 'save').mockResolvedValue(stocksData)
        let response = await stocksService.addNewStocks(stocksData as StocksDTO)
        expect(response).toEqual(msg);
        expect(saveOneSpy).toHaveBeenCalled();

      })

    })

    describe("AND Failed", () => {
      it("should return response", async () => {
        let saveError = jest.spyOn(stocksRepository, 'save').mockRejectedValue(new Error('Some internal server error'))
        let response = await stocksService.addNewStocks(stocksData);
        expect(response).rejects.toThrow(HttpException);
        expect(saveError).toHaveBeenCalled();

      })

    })

  })

  describe("When listOfStocks()", () => {
    describe("And success", () => {
      it("should return response", async () => {
        let findSpy = jest.spyOn(stocksRepository, 'find').mockResolvedValue(stocksData);
        let response = await stocksService.listOfStocks();
        expect(response).toEqual(stocksData);
        expect(findSpy).toHaveBeenCalled();
      })
    })
    describe("And Failed", () => {
      it("should return error", async () => {
        let findSpy = jest.spyOn(stocksRepository, 'find').mockRejectedValue(new Error('some internal error'));
        await expect(stocksService.listOfStocks()).rejects.toThrow(HttpException);
        expect(findSpy).toHaveBeenCalled();
      })
    })
  })

});

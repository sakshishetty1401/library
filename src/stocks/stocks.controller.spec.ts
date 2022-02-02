import { Stocks } from './stocks.entity';
import { StocksService } from './stocks.service';
import { Test, TestingModule } from '@nestjs/testing';
import { StocksController } from './stocks.controller';
import { plainToInstance } from 'class-transformer';
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
/**
 * import dto and entity
 */
const stockImportDTO = plainToInstance(StocksDTO, Stocks)
describe('StocksController', () => {
    let stocksController: StocksController;
    let stocksService: StocksService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StocksController],
            providers: [StocksService, {
                provide: StocksService,
                useFactory: () => ({
                  addNewStocks : jest.fn(),
                  listOfStocks: jest.fn(),
                    searchStocks: jest.fn()
                })
            }]
        }).compile();

        stocksController = module.get<StocksController>(StocksController);
        stocksService = module.get<StocksService>(StocksService);
    });

    it('should be defined', () => {
        expect(stocksController).toBeDefined();
    });

    describe('When addNewStocks()', () => {
        it('should return response', async () => {
            let findOneSpy = jest.spyOn(stocksService, 'addNewStocks').mockResolvedValue(stocksData);
            let response = await stocksController.addNewStocks(stocksData);
            expect(response).toEqual(stocksData);
            expect(findOneSpy).toHaveBeenCalled()
        })
    })

    describe('When listOfStocks()', () => {
        it('should return response', async () => {
            let getAllProductSpy = jest.spyOn(stocksService, 'listOfStocks').mockResolvedValue(stocksData as Stocks[]);
            let response = await stocksController.listOfStocks();
            expect(response).toEqual(stocksData);
            expect(getAllProductSpy).toHaveBeenCalled()
            expect(getAllProductSpy).toHaveBeenCalledTimes(1);
        })
    })

    describe('When searchStocks()', () => {
        it('should return response', async () => {
            let getAllProductSpy = jest.spyOn(stocksService, 'searchStocks').mockResolvedValue(stocksData as Stocks[]);
            let response = await stocksController.searchStocks('HCL');
            expect(response).toEqual(stocksData);
            expect(getAllProductSpy).toHaveBeenCalled()
            expect(getAllProductSpy).toHaveBeenCalledTimes(1);
        })
    })
});

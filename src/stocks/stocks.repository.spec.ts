import { StocksDTO } from './stocks.dto';
import { Test } from "@nestjs/testing";
import { StocksRepository } from "./stocks.repository";
let stocksRelation: any = { id: 1, name: "HCL", currentPrice: 1200, QOQ: "6%", quantity: 32 }
describe("StocksRepository", () => {
    let stocksRepository;
    beforeEach(async () => {
        let module = await Test.createTestingModule
            ({
                providers: [StocksRepository,
                    {
                        provide: StocksRepository,
                        useFactory: () => ({
                            find: jest.fn()
                        })
                    }],
            }).compile();

        stocksRepository = module.get(StocksRepository)
    })
    it("should be defined", () => {
        expect(stocksRepository).toBeDefined()
    })
    describe('When searchStocks()', () => {
        it("should return response", async () => {
            const searchByStocksNameSpy = jest.spyOn(stocksRepository, 'find').mockResolvedValue(stocksRelation as StocksDTO[]); 
            let response = await stocksRepository.searchByStocksName('HCL'); expect(response).toEqual(stocksRelation)
            expect(searchByStocksNameSpy).toHaveBeenCalled();
            expect(searchByStocksNameSpy).toHaveBeenCalledTimes(1);
            expect(searchByStocksNameSpy).toHaveBeenCalledWith({ id: 1, name: "HCL", currentPrice: 1200, QOQ: "6%", quantity: 32 });
        })
    })
})
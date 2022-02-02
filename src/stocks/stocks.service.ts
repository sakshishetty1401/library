import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { FETCH_STOCKS_NAME, LIST_OF_STOCKS, NOT_ABLE_FETCH, NO_STOCKS_NAME, STOCKS_ADDED_ID, STOCKS_NOTFOUND_ID } from '../../constant';
import { UserRepository } from '../user/user.repository';
import { StocksDTO } from './stocks.dto';
import { Stocks } from './stocks.entity';
import { StocksRepository } from './stocks.repository';

/**
 * It will insert/update/delete/retrieve stocks information in the database/repository
 */
@Injectable()
export class StocksService {

   /**
   * Logger Instance
   */
  logger = new Logger(StocksService.name);

  /**
   * Dependency Injection
   * @param booksRepository 
   * @param usersRepository 
   */
  constructor(private stocksRepository: StocksRepository,
    private userRepository: UserRepository) { }


  /**
   * create/insert into a database 
   * @param stocks
   * @returns 
   * @throws InternalServerErrorException(errorMessage)
   */
  async addNewStocks(stocks: StocksDTO): Promise<string> {
    try {
      let response:StocksDTO = await this.stocksRepository.save(stocks);
      if (response) {
        const message: string = STOCKS_ADDED_ID + `${response.id}`;
        this.logger.log(message)
        return message;
      } else {
        throw new NotFoundException(STOCKS_NOTFOUND_ID )
      }

    }
    catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }


  /**
   * Fetching the data
   * @returns  
   */
   async listOfStocks(): Promise<Stocks[]> {
    try {
      const response:StocksDTO[] = await this.stocksRepository.find();
      if (response) {
        const msg:string =  LIST_OF_STOCKS ;
        this.logger.log(msg);
        return response;
      } else {
        const message:string = NOT_ABLE_FETCH;
        this.logger.error(message);
        throw new HttpException(message, HttpStatus.BAD_REQUEST);
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  /**
     * Fetch all stocks who's by Name is like given name
     * @param name 
     * @returns 
     */
   async searchStocks(name: string): Promise<StocksDTO[]> {
    try {
        let response : StocksDTO[] = await this.stocksRepository.searchByStocksName(name);
        if (response) {
            this.logger.log(FETCH_STOCKS_NAME + `${name}`)
            return response;
        } else {
            const message: string = NO_STOCKS_NAME + `${name}`
            this.logger.warn(message)
            throw new NotFoundException(message)
        }
        return response;
    } catch (error) {
        this.logger.log(error.message)
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }

}
}

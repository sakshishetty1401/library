import { Body, Controller, Get, HttpStatus, Logger, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBasicAuth, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FAILEDTOFETCH_STOCKS_NAME, FAILED_FETCH_STOCKS, NAME_FOUND, NAME_NOT_FOUND, STOCKS_ADDED, STOCKS_FETCHED_SUCCESS, STOCKS_ID_NOTFOUND, STOCKS_NOT_FOUND, USER_ID_NOTFOUND } from '../../constant';
import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';
import { StocksDTO } from './stocks.dto';
import { Stocks } from './stocks.entity';
import { StocksService } from './stocks.service';

/**
 * Stocks Controller includes handler fro CRUD operation
 * @author : sakshi shetty
 */

 @ApiBasicAuth('swagger-auth')
 @ApiTags('Stocks')
 @UseGuards(JwtAuthGuard)
 @Controller('stocks')
 export class StocksController {
    
    constructor(private stocksService: StocksService) { }

    /**
     * Logger instance
     */
    logger = new Logger(StocksController.name)

    /**
    * Adding a new books
    * @param books
    * @returns 
    */
    @ApiOkResponse({ description: STOCKS_ADDED, status: HttpStatus.OK })
    @ApiNotFoundResponse({ description: STOCKS_NOT_FOUND, status: HttpStatus.NOT_FOUND })
    @ApiInternalServerErrorResponse({ description: FAILED_FETCH_STOCKS, status: HttpStatus.INTERNAL_SERVER_ERROR })
    @Post()
    addNewStocks(@Body() stocks: StocksDTO): Promise<string> {
        return this.stocksService.addNewStocks(stocks);
    }

    /**
     * Books fetched the successfully
     * @returns 
     */
     @ApiOkResponse({ description: STOCKS_FETCHED_SUCCESS , status: HttpStatus.OK })
     @ApiNotFoundResponse({ description: STOCKS_ID_NOTFOUND, status: HttpStatus.NOT_FOUND })
     @ApiInternalServerErrorResponse({ description: FAILED_FETCH_STOCKS, status: HttpStatus.INTERNAL_SERVER_ERROR })
     @Get()
     listOfStocks(): Promise<Stocks[]> {
         return this.stocksService.listOfStocks();
     }

     /**
     * get all list stocks by name
     * @param 
     */
      @ApiOkResponse({ description: NAME_FOUND, status: HttpStatus.OK })
      @ApiNotFoundResponse({ description: NAME_NOT_FOUND, status: HttpStatus.NOT_FOUND })
      @ApiInternalServerErrorResponse({description:FAILEDTOFETCH_STOCKS_NAME, status:HttpStatus.INTERNAL_SERVER_ERROR})
      @Get('by-name/:name')
      searchStocks(@Param('name') name: string) {
          return this.stocksService.searchStocks(name)
      }
   
    }




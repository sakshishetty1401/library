import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../orders/dto/orders.entity';
import { OrdersRepository } from '../orders/Orders.repository';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { StocksController } from './stocks.controller';
import { Stocks } from './stocks.entity';
import { StocksRepository } from './stocks.repository';
import { StocksService } from './stocks.service';

@Module({
  imports:[
    // CacheModule.register({
    //   ttl: 60
    // }),
    TypeOrmModule.forFeature([Stocks,User, Orders, OrdersRepository, StocksRepository, UserRepository])],
  controllers: [StocksController],
  providers: [StocksService]
})
export class StocksModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { StocksModule } from './stocks/stocks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';

/**
 * Core module
 */
@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, OrdersModule, StocksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from './dto/orders.entity';
import { OrdersRepository } from './Orders.repository';
import { UserRepository } from '../user/user.repository';
import { User } from '../user/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Orders, User, UserRepository, OrdersRepository])],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}

import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entyties/order.entity';
import { User } from '../entyties/user.entyti';
import { Product } from '../entyties/product.entyti';
import { OrderInfo } from '../entyties/order-info.entity';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports:[TypeOrmModule.forFeature([Order,User,Product,OrderInfo])]
})
export class OrdersModule {}

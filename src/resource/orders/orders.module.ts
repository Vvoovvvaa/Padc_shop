import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../entyties/order.entity';
import { User } from '../entyties/user.entyti';
import { Products } from '../entyties/product.entyti';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports:[TypeOrmModule.forFeature([Orders,User,Products])]
})
export class OrdersModule {}

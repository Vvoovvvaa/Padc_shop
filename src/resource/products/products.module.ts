import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entyties/product.entyti';
import { ProductsService } from './products.service';
import {ServeStaticModule} from '@nestjs/serve-static';
import { join } from 'path';
import { Category } from '../entyties/category.entyti';
import { User } from '../entyties/user.entyti';
import { Order } from '../entyties/order.entity';
import { ProductPhotos } from '../entyties/photos-entity';

@Module({
  controllers: [ProductsController],
  imports: [
    TypeOrmModule.forFeature([Product,Category,User,Order,ProductPhotos])],
  providers: [ProductsService],
})
export class ProductModule {}
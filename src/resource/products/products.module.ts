import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entyties/product.entyti';
import { ProductsService } from './products.service';
import {ServeStaticModule} from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  controllers: [ProductsController],
  imports: [
    TypeOrmModule.forFeature([Product])],
  providers: [ProductsService],
})
export class ProductModule {}
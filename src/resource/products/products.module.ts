import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../entyties/product.entyti';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Products])],
  providers: [ProductsService],
})
export class ProductModule {}
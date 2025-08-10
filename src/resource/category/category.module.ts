import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entyties/category.entyti';

@Module({
  controllers: [CategoryController],
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
})
export class CategoryModule {}

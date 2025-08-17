import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entyties/category.entyti';
import { User } from '../entyties/user.entyti';
import { ProductPhotos } from '../entyties/photos-entity';
import { AuthModule } from '../auth/auth-module';

@Module({
  controllers: [CategoryController],
  imports: [TypeOrmModule.forFeature([Category,User,ProductPhotos]),AuthModule],
  providers: [CategoryService],
})
export class CategoryModule {}

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entyties/category.entyti';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CategoryDto } from './DTO/category-dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categorRepository:Repository<Category>,
    ) { }

    async createCategory(category: CategoryDto):Promise<Category>{
      const proverka = await this.categorRepository.findOne({ where: {categoryName:category.categoryName}})
      if(proverka){
        throw new ConflictException("Category are exicitng,rename category")
      }
      const newCategory = this.categorRepository.create(category)
      const saveCategory = this.categorRepository.save(newCategory)
      return saveCategory;
    }

    allCategories(){
        return this.categorRepository.find()
    }
}

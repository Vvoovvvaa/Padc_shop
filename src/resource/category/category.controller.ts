import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from '../entyties/category_entyties';
import { CategoryDto } from './DTO/category_dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService:CategoryService
    ) { }

    @Get('all')
    async all(){
        return this.categoryService.allCategories()
    }

    @Post('create')
    async createcategory(@Body()categorydto:CategoryDto){
        return this.categoryService.createCategory(categorydto)
    }
}

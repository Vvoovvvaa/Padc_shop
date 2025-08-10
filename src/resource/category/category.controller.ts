import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './DTO/category-dto';
import { IdDto } from 'src/dto/id-param.dto';

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
    async createcategory(@Body() categorydto:CategoryDto){
        return this.categoryService.createCategory(categorydto)
    }
}

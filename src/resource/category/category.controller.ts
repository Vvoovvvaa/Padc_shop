import { Body, Controller, Get, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './DTO/category-dto';
import { IdDto } from 'src/dto/id-param.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ProductDto } from '../products/DTO/products-dto';
import * as fs from 'fs'

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
  @UseInterceptors(FileInterceptor('photo'))
  uploadCategory(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CategoryDto
) {
    return this.categoryService.createCategory(body, file);
}

}

import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './DTO/category-dto';
import { IdDto } from 'src/dto/id-param.dto';
import { FileInterceptor } from '@nestjs/platform-express';
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
      uploadFile(@UploadedFile() file: Express.Multer.File,@Body() body:CategoryDto) {
      if(!fs.existsSync(process.cwd() + '/uploads/category')){
        fs.mkdirSync(process.cwd() + '/uploads/category' )
      }
      fs.writeFileSync('uploads/category/' + file.originalname,file.buffer)
      body.photo = file.originalname
      return this.categoryService.createCategory(body)
}
}

import { Body, Controller,Get,Param,Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './DTO/products-dto';
import { CategoryDto } from '../category/DTO/category-dto';
import { IdDto } from 'src/dto/id-param.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs'

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productservice:ProductsService
    ) { }

    @Get('all')
    async allProducts(){
        return this.productservice.allProducts()
    }

    @Post('create')
      @UseInterceptors(FileInterceptor('photo'))
      uploadFile(@UploadedFile() file: Express.Multer.File,@Body() body:ProductDto) {
      if(!fs.existsSync(process.cwd() + '/uploads/products')){
        fs.mkdirSync(process.cwd() + '/uploads/products' )
      }
      fs.writeFileSync('uploads/products/' + file.originalname,file.buffer)
      body.photo = file.originalname
      return this.productservice.addProducts(body)
}
}
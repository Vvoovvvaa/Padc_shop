import { Body, Controller,Get,Param,Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './DTO/products-dto';
import { CategoryDto } from '../category/DTO/category-dto';
import { IdDto } from 'src/dto/id-param.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs'
import { Product } from '../entyties/product.entyti';

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
      const photoPath = `uploads/products/${file.originalname}`
      fs.writeFileSync(photoPath,file.buffer)
      const withphoro = {...body,photo:photoPath}
      return this.productservice.addProducts(withphoro)
}
}
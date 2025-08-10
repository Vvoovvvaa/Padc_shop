import { Body, Controller,Get,Param,Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './DTO/products-dto';
import { CategoryDto } from '../category/DTO/category-dto';
import { IdDto } from 'src/dto/id-param.dto';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productservice:ProductsService
    ) { }

    @Post('create')
    async createProduct(IdDto,@Body() prodcutDto:ProductDto){
        return this.productservice.addProducts(prodcutDto)
    }

    @Get('all')
    async allProducts(){
        return this.productservice.allProducts()
    }
}

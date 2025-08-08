import { Body, Controller,Get,Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './DTO/products_dto';
import { CategoryDto } from '../category/DTO/category_dto';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productservice:ProductsService
    ) { }

    @Post('create')
    async createProduct(@Body() prodcutDto:ProductDto){
        return this.productservice.addProducts(prodcutDto)
    }

    @Get('all')
    async allProducts(){
        return this.productservice.allProducts()
    }
}

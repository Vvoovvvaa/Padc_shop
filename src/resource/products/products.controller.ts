import { Body, Controller,Get,Param,Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './DTO/products-dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';


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
    @UseInterceptors(FilesInterceptor('photo'))
    async createProduct(
        @UploadedFiles() files: Express.Multer.File[],
        @Body() dto: ProductDto
    ) {
        return this.productservice.addPhotos(dto, files);
    }
}
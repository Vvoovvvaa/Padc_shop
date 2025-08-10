import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../entyties/product.entyti';
import { Repository } from 'typeorm';
import { ProductDto } from './DTO/products-dto';
import { Category } from '../entyties/category.entyti';
import { IdDto } from 'src/dto/id-param.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private readonly productsrepositor:Repository<Products>,
    ){ }

    async addProducts(products: ProductDto):Promise<Products>{
        const proverka  = await this.productsrepositor.findOne({where:{productName:products.productName}})
        if(proverka){
            throw new ConflictException("this product are exic,rename product")
        }

        const NewProduct = this.productsrepositor.create(products)
        const saveProduct = this.productsrepositor.save(NewProduct)
        return saveProduct;
    }

    async allProducts(){
        return this.productsrepositor.find()
    }
}

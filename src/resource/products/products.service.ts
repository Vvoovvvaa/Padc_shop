import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entyties/product.entyti';
import { Repository } from 'typeorm';
import { ProductDto } from './DTO/products-dto';
import { Category } from '../entyties/category.entyti';
import { IdDto } from 'src/dto/id-param.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsrepositor:Repository<Product>,
    ){ }

    async addProducts(products: ProductDto):Promise<Product>{
        const proverka  = await this.productsrepositor.findOne({where:{name:products.name}})
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

import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entyties/product.entyti';
import { Repository } from 'typeorm';
import { ProductDto } from './DTO/products-dto';
import { Category } from '../entyties/category.entyti';
import { FileHelper } from 'src/helpers/file-helper';
import { ProductPhotos } from '../entyties/photos-entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(ProductPhotos)
    private readonly photosRepository: Repository<ProductPhotos>,
  ) {}

  async addPhotos(dto: ProductDto, files: Express.Multer.File[]) {
    const category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
    });
    if (!category) {
      throw new NotFoundException("Category not found");
    }

    const MAX_SIZE = 5 * 1024 * 1024;
    const ALLOWED_TYPES = ['image/jpeg', 'image/jpg'];

    const product = this.productsRepository.create({
      name: dto.name,
      price: dto.price,
      description: dto.description,
      category,
    });
    await this.productsRepository.save(product);

    const photoEntities: ProductPhotos[] = [];

    for (const file of files) {
      if (!file) continue;

      if (file.size > MAX_SIZE) {
        throw new BadRequestException(
          ` ${file.originalname} maximum 5MB,try again`,
        );
      }

      if (!ALLOWED_TYPES.includes(file.mimetype)) {
        throw new BadRequestException(
          ` ${file.originalname} not supporting this format`,
        );
      }

      const filePath = FileHelper.savefile("products", file);

      const photoEntity = this.photosRepository.create({
        path: filePath, 
        product,
      });

      photoEntities.push(photoEntity);
    }

    await this.photosRepository.save(photoEntities);

    return await this.productsRepository.findOne({
      where: { id: product.id },
      relations: ['photos', 'category'],
    });
  }

  async allProducts() {
    return this.productsRepository.find({
      relations: ['photos', 'category'],
    });
  }
}

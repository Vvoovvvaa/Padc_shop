import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entyties/category.entyti';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CategoryDto } from './DTO/category-dto';
import { ProductPhotos } from '../entyties/photos-entity';
import { FileHelper } from 'src/helpers/file-helper';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categorRepository:Repository<Category>,
        @InjectRepository (ProductPhotos)
        private readonly phorotosRepositroy:Repository<ProductPhotos>
    ) { }

    async createCategory(dto: CategoryDto, file?: Express.Multer.File) {
    let parent: Category | undefined;
    if (dto.parentId) {
        const found = await this.categorRepository.findOne({ where: { id: dto.parentId } });
        if (!found) {
            throw new NotFoundException("Parent not found");
        }
        parent = found;
    }
    const existing = await this.categorRepository.findOne({
        where: { categoryName: dto.categoryName },
    });
    if (existing) {
        throw new ConflictException("Category already exists, rename category");
    }

    const newCategory = this.categorRepository.create({
        categoryName: dto.categoryName,
        description: dto.description,
        parent,
    });
    await this.categorRepository.save(newCategory);

    if (file) {
        const MAX_SIZE = 5 * 1024 * 1024; 
        const ALLOWED_TYPES = ['image/jpeg', 'image/jpg'];

        if (file.size > MAX_SIZE) {
            throw new BadRequestException(`${file.originalname} maximum 5MB,try again`);
        }

        if (!ALLOWED_TYPES.includes(file.mimetype)) {
            throw new BadRequestException(`${file.originalname} formate is not aviable`);
        }

        const path = FileHelper.savefile("categories", file);
        if (!path) {
            throw new BadRequestException("file not saved");
        }

        const photoEntity = this.phorotosRepositroy.create({
            path: path,
            category: newCategory,
        });

        await this.phorotosRepositroy.save(photoEntity);
        newCategory.photos = [photoEntity];
    }
    return await this.categorRepository.findOne({
        where: { id: newCategory.id },
        relations: ['photos', 'parent'],
    });
}


    allCategories(){
        return this.categorRepository.find()
    }
}

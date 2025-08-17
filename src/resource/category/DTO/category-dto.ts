import { isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class CategoryDto{
    @IsNotEmpty()
    categoryName:string

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    description:string

    @IsOptional()
    @IsNumber()
    parentId:number



    

    
}
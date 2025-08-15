import { isNotEmpty, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class CategoryDto{
    @IsNotEmpty()
    categoryName:string

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    description:string

    // @IsOptional()
    // photo:string

    

    
}
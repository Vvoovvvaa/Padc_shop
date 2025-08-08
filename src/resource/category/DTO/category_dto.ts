import { isNotEmpty, IsNotEmpty, IsString, MinLength } from "class-validator"
import { EnumCategory } from "../enums/category_enum"

export class CategoryDto{
    @IsNotEmpty()
    categoryName:string

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    description:string
    
    // @IsNotEmpty()
    // parentId:number

    type:EnumCategory
}
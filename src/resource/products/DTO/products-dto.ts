import { IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class ProductDto{
    @IsNotEmpty()
    @IsString()
    readonly name:string

    @IsNotEmpty()
    @IsInt()
    readonly categoryId:number

    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    readonly description:string

    @IsNotEmpty()
    @IsInt()
    readonly price:number

//     @IsOptional()
//     photo:string
}
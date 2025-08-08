import { IsInt, IsNotEmpty, IsString, MinLength } from "class-validator"

export class ProductDto{
    @IsNotEmpty()
    @IsString()
    readonly productName:string

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
}
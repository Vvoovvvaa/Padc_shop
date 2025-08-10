import { IsInt, IsNotEmpty } from "class-validator";

export class OrderDto{
    @IsInt()
    @IsNotEmpty()
    productId:number

    @IsInt()
    @IsNotEmpty()
    userId:number

    @IsInt()
    @IsNotEmpty()
    quantity:number

    @IsInt()
    @IsNotEmpty()
    price:number
}
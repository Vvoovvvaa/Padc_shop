import { IsString, IsEmail, MinLength, IsInt, Min, Max, IsPhoneNumber, IsBoolean, isEnum, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';


export class RegisterDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly firstName:string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    readonly lastName:string
    
    @IsNotEmpty()
    @IsNumber()
    @Min(16)
    @Max(80)
    readonly age:number
    
    @IsNotEmpty()
    @IsEmail()
    readonly email:string

    @IsString()
    @IsNotEmpty()
    @MinLength(7)
    readonly password:string
}
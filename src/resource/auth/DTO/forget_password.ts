import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"


export class ForgetDto{
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @IsString()
    firstName:string

    @MinLength(6)
    @IsString()
    newPassword:string
}
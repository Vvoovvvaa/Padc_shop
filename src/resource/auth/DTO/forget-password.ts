import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator"
import { Column } from "typeorm"


export class ForgetDto{
    @IsNotEmpty()
    @IsEmail()
    readonly email:string



    // @MinLength(6)
    // @IsString()
    // newPassword:string
}
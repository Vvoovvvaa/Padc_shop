import { IsNotEmpty, IsString, MinLength } from "class-validator";


export class NewpasswordDto{
    @IsNotEmpty()
    @MinLength(6)
    @IsString()
    readonly password:string


    @IsNotEmpty()
    @IsString()
    readonly token:string


}
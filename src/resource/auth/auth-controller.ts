import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth-service';
import { RegisterDto } from './DTO/register-dto';
import { LoginDto } from './DTO/login-dto';
import { ForgetDto } from './DTO/forget-password';
import { NewpasswordDto } from './DTO/newpassword-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authservice:AuthService
    ){}

    @Post('login')
    async login(@Body() logindto:LoginDto){
        return this.authservice.login(logindto)
    }

    @Post('forget')
    async forget(@Body() forgetDto:ForgetDto){
        return this.authservice.forgetPassword(forgetDto)
    }

    @Post('check')
    async check(@Body() body:{code:string,token:string}){
        return await this.authservice.checkusers(body.code,body.token)
    }

    @Post('newpassword')
    async new(@Body() newdto:NewpasswordDto){
        return await this.authservice.newPassword(newdto)
    }

    @Post('register')
    @UseInterceptors(FileInterceptor('photo'))
    uploadFile(@UploadedFile() file: Express.Multer.File,@Body() body:RegisterDto){
    if(!fs.existsSync(process.cwd() + '/uploads/user')){
        fs.mkdirSync(process.cwd() + '/uploads/user' )
    }
    fs.writeFileSync('uploads/user/' + file.originalname,file.buffer)
    body.photo = file.originalname
    return this.authservice.register(body)
    }
    

    

}

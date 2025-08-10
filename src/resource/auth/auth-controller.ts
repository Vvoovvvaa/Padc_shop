import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth-service';
import { RegisterDto } from './DTO/register-dto';
import { LoginDto } from './DTO/login-dto';
import { ForgetDto } from './DTO/forget-password';
import { NewpasswordDto } from './DTO/newpassword-dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authservice:AuthService
    ){}

    @Post('register')
    async register(@Body() registerdto:RegisterDto){
        return this.authservice.register(registerdto)
    }

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
    

}

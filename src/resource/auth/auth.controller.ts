import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './DTO/register_dto';
import { LoginDto } from './DTO/login_dto';
import { ForgetDto } from './DTO/forget_password';

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
}

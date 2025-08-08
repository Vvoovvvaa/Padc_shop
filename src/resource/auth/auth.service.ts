import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entyties/user_entyties';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './DTO/register_dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './DTO/login_dto';
import { ForgetDto } from './DTO/forget_password';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtservice: JwtService,
  ) {}

  async register(register: RegisterDto): Promise<{ access_token: string }> {
    const existingUser = await this.userRepository.findOne({
      where: { email: register.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(register.password, 12);

    const newUser = this.userRepository.create({
      ...register,password: hashedPassword,
    });

    try {
      const savedUser = await this.userRepository.save(newUser);
      const payload = {
        sub: savedUser.id,
        email: savedUser.email,
      };
      return { access_token: this.jwtservice.sign(payload) };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Registration failed');
    }
  }

 async login(login: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
        where: { email: login.email },
    });

    if (!user) {
        throw new BadRequestException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(login.password, user.password);

    if (!isPasswordValid) {
        throw new BadRequestException('Password is wrong, try again');
    }

    const payload = {
        sub: user.id,
        email: user.email,
    };

    return {
        access_token: this.jwtservice.sign(payload, {
            secret: process.env.JWT_SECRET, 
            expiresIn: '3600s', 
        }),
    };
}


  async forgetPassword(forget:ForgetDto):Promise<{acess_tokem:string}>{
    const user = await this.userRepository.findOne({where:{email:forget.email}})
       
    if(!user){
      throw new BadRequestException("Nou found user fof this email")
    }

    if(forget.firstName != user.firstName){
      throw new BadRequestException("Not found user for this username")
    }

    const hash = await bcrypt.hash(forget.newPassword,12)
    user.password = forget.newPassword

    await this.userRepository.save(user)
    
    const ployd = {sub:user.id,email:user.email}
    return {
      acess_tokem:this.jwtservice.sign(ployd,{
        secret:process.env.JWT_SECRET,
        expiresIn: '3600s', 
      })}
    
  }
}

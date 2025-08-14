import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entyties/user.entyti';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './DTO/register-dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './DTO/login-dto';
import { ForgetDto } from './DTO/forget-password';
import { SecretCode } from '../entyties/secret.entity';
import { NewpasswordDto } from './DTO/newpassword-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtservice: JwtService,
    @InjectRepository(SecretCode)
    private readonly secretcoderepo:Repository<SecretCode>
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
      ...register,password: hashedPassword
    });


      const savedUser = await this.userRepository.save(newUser);
      const payload = {
        sub: savedUser.id,
        email: savedUser.email,
        photo: savedUser.photo
      };

      return { access_token: this.jwtservice.sign(payload,{
        secret:process.env.JWT_SECRET
      }) };

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


async forgetPassword(forgetPasswordDto: ForgetDto): Promise<{ access_token: string; code: number }> {
  const user = await this.userRepository.findOne({ where: { email: forgetPasswordDto.email } });
  if (!user) {
    throw new UnauthorizedException('User not found');
  }

  await this.secretcoderepo.delete({user:{id:user.id}})

  const random_nums = Math.floor(100000 + Math.random() * 900000)

  const secretCode = this.secretcoderepo.create({
    code: random_nums.toString(), 
    user,
  });

  await this.secretcoderepo.save(secretCode);

  const payload = { sub: user.id, email: user.email };

  return {
    access_token: this.jwtservice.sign(payload, {
      secret: process.env.JWT_SECRET,
    }),
    code: random_nums,
  };
}


async checkusers(code: string, token: string): Promise<boolean> {
  const secret = await this.secretcoderepo.findOne({
    where: { code },
    relations: ['user'],
  });

  if (!secret) {
    throw new BadRequestException('wrong code');
  }

  if(!token){
    throw new BadRequestException("wrong token")
  }

  try {
    const tokenData = this.jwtservice.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    if (tokenData.sub !== secret.user.id) {
      throw new UnauthorizedException('wrong code to worng user');
    }
  } catch {
    throw new UnauthorizedException('time for token is ended');
  }
  secret.isVerify = true
  await  this.secretcoderepo.save(secret)
  return true;
}

async newPassword(dto: NewpasswordDto): Promise<{ message: string }> {
    const payload = this.jwtservice.verify(dto.token, {
      secret: process.env.JWT_SECRET,
    });

    const user = await this.userRepository.findOne({ where: { id: payload.sub } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const secret = await this.secretcoderepo.findOne({
      where: { user: { id: user.id }, isVerify: true }, 
    });

    if (!secret) {
      throw new UnauthorizedException('Code not verified');
    }

    user.password = await bcrypt.hash(dto.password, 12);
    await this.userRepository.save(user);

    await this.secretcoderepo.delete({ id: secret.id });

    return { message: 'Password reset successfully' };
  }

}





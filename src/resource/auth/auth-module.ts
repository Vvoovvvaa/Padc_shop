import { Module } from '@nestjs/common';
import { AuthService } from './auth-service';
import { AuthController } from './auth-controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entyties/user.entyti';
import { JwtModule } from '@nestjs/jwt';
import { SecretCode } from '../entyties/secret.entity';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([User,SecretCode]),
      JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}

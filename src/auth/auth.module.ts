import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { jwtAccessConfig } from '../config/configs';

@Module({
  imports: [UsersModule, ConfigModule, JwtModule.register(jwtAccessConfig)],
  controllers: [AuthController],
  providers: [AuthService, ConfigService],
})
export class AuthModule {}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import {
  IJwtConfig,
  JWT_ACCESS_CONFIG,
  JWT_REFRESH_CONFIG,
} from '../config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(
    username: string,
    pass: string,
    response: Response,
  ): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    if (!(await bcrypt.compare(pass, user.passwordHash))) {
      throw new UnauthorizedException();
    }

    return this.generateTokens(user, response);
  }

  async signOut(response: Response): Promise<any> {
    response.cookie('access_token', '', {
      sameSite: 'none',
      secure: true,
      expires: new Date(0),
    });
    response.cookie('refresh_token', '', {
      sameSite: 'none',
      secure: true,
      expires: new Date(0),
    });
  }

  async refresh(refresh: string, response: Response): Promise<any> {
    try {
      const { secret } = this.configService.get<IJwtConfig>(JWT_REFRESH_CONFIG);

      const { sub } = await this.jwtService.verifyAsync(refresh, {
        secret,
      });

      const user = await this.usersService.findOneById(sub);

      return this.generateTokens(user, response);
    } catch {
      throw new UnauthorizedException();
    }
  }

  async generateTokens(user: User, response: Response) {
    const accessConf = this.configService.get<IJwtConfig>(JWT_ACCESS_CONFIG);
    const refreshConf = this.configService.get<IJwtConfig>(JWT_REFRESH_CONFIG);

    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: refreshConf.secret,
      expiresIn: refreshConf.expiration,
    });

    response.cookie('access_token', accessToken, {
      sameSite: 'none',
      secure: true,
      expires: new Date(Date.now() + 1000 * accessConf.expiration),
    });
    response.cookie('refresh_token', refreshToken, {
      sameSite: 'none',
      secure: true,
      expires: new Date(Date.now() + 1000 * refreshConf.expiration),
    });

    return { accessToken, refreshToken };
  }
}

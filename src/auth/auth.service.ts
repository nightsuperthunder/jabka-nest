import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ITokensConfig, JWT_CONFIG } from '../config/jwt.config';
import { CreateUserDto } from '../users/dto';

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
      const {
        refresh: { secret },
      } = this.configService.get<ITokensConfig>(JWT_CONFIG);

      const { sub } = await this.jwtService.verifyAsync(refresh, {
        secret,
      });

      const user = await this.usersService.findOneById(sub);

      return this.generateTokens(user, response);
    } catch {
      throw new UnauthorizedException();
    }
  }

  async register(
    createUserDto: CreateUserDto,
    response: Response,
  ): Promise<any> {
    const user = await this.usersService.create(createUserDto);

    return this.generateTokens(user, response);
  }

  async generateTokens(user: User, response: Response) {
    const tokensConf = this.configService.get<ITokensConfig>(JWT_CONFIG);

    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: tokensConf.access.secret,
      expiresIn: tokensConf.access.expiration,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: tokensConf.refresh.secret,
      expiresIn: tokensConf.refresh.expiration,
    });

    response.cookie('access_token', accessToken, {
      sameSite: 'none',
      secure: true,
      expires: new Date(Date.now() + 1000 * tokensConf.access.expiration),
    });
    response.cookie('refresh_token', refreshToken, {
      sameSite: 'none',
      secure: true,
      expires: new Date(Date.now() + 1000 * tokensConf.refresh.expiration),
    });

    return { accessToken, refreshToken };
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { IJwtConfig, JWT_ACCESS_CONFIG } from '../config/jwt.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken =
      this.extractTokenFromHeader(request) ||
      this.extractTokenFromCookies(request);

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const { secret } = this.configService.get<IJwtConfig>(JWT_ACCESS_CONFIG);

    try {
      request['user'] = await this.jwtService.verifyAsync(accessToken, {
        secret,
      });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private extractTokenFromCookies(request: Request): string | undefined {
    const { access_token } = request.cookies;
    if (request.cookies && access_token) {
      return access_token;
    }

    return undefined;
  }
}

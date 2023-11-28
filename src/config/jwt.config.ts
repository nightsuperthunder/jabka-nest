import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

interface IJwtConfig {
  secret: string;
  expiration: number;
}

export interface ITokensConfig {
  access: IJwtConfig;
  refresh: IJwtConfig;
}

export const JWT_CONFIG = 'jwt-config';
export const JWT_ACCESS_CONFIG = 'jwt-access-config';
export const JWT_REFRESH_CONFIG = 'jwt-refresh-config';

const jwtConfig = registerAs(
  JWT_CONFIG,
  (): ITokensConfig => ({
    access: {
      secret: process.env.JWT_ACCESS_SECRET,
      expiration: +process.env.JWT_ACCESS_EXPIRATION,
    },
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET,
      expiration: +process.env.JWT_REFRESH_EXPIRATION,
    },
  }),
);

const jwtAccessConfig = registerAs(
  JWT_ACCESS_CONFIG,
  (): JwtModuleOptions => ({
    global: true,
    secret: process.env.JWT_ACCESS_SECRET,
    signOptions: { expiresIn: process.env.JWT_ACCESS_EXPIRATION + 's' },
  }),
);

const jwtRefreshConfig = registerAs(
  JWT_REFRESH_CONFIG,
  (): JwtModuleOptions => ({
    global: true,
    secret: process.env.JWT_REFRESH_SECRET,
    signOptions: { expiresIn: process.env.JWT_REFRESH_EXPIRATION + 's' },
  }),
);

export default [jwtConfig, jwtRefreshConfig, jwtAccessConfig];

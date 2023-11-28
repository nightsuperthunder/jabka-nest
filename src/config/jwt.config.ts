import { registerAs } from '@nestjs/config';

export interface IJwtConfig {
  secret: string;
  expiration: number;
}

export const JWT_ACCESS_CONFIG = 'jwt-access-config';
export const JWT_REFRESH_CONFIG = 'jwt-refresh-config';

const jwtAccessConfig = registerAs(
  JWT_ACCESS_CONFIG,
  (): IJwtConfig => ({
    secret: process.env.JWT_ACCESS_SECRET,
    expiration: +process.env.JWT_ACCESS_EXPIRATION,
  }),
);

const jwtRefreshConfig = registerAs(
  JWT_REFRESH_CONFIG,
  (): IJwtConfig => ({
    secret: process.env.JWT_REFRESH_SECRET,
    expiration: +process.env.JWT_REFRESH_EXPIRATION,
  }),
);

export default [jwtRefreshConfig, jwtAccessConfig];

import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

const configService = new ConfigService();

export const jwtAccessConfig: JwtModuleOptions = {
  global: true,
  secret: configService.get('JWT_ACCESS_SECRET'),
  signOptions: { expiresIn: configService.get('JWT_ACCESS_EXPIRATION') + 's' },
};

export const typeOrmDatabaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: configService.get('DATABASE_HOST'),
  port: +configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USERNAME'),
  password: configService.get('DATABASE_PASSWORD') as string,
  database: configService.get('DATABASE_DATABASE'),
  logging: true,
  synchronize: true,
  autoLoadEntities: true,
};

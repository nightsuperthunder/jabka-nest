import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface IDatabaseConfig {
  DATABASE_TYPE: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_DATABASE: string;
}

export const DATABASE_CONFIG = 'database-config';

export default registerAs(
  DATABASE_CONFIG,
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD as string,
    database: process.env.DATABASE_DATABASE,
    logging: true,
    synchronize: true,
    autoLoadEntities: true,
  }),
);

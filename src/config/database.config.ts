import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as dotEnvConfig } from 'dotenv';

dotEnvConfig({ path: '.env' });

export const DATABASE_CONFIG = 'database-config';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_DATABASE,
  logging: true,
  // synchronize: true,
  autoLoadEntities: true,
};

export default registerAs(DATABASE_CONFIG, (): TypeOrmModuleOptions => config);
export const connectionSource = new DataSource(config as DataSourceOptions);

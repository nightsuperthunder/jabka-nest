import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './config/app-config.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmDatabaseConfig } from './config/configs';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRoot(typeOrmDatabaseConfig),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}

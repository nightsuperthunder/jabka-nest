import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppConfigModule } from './config/app-config.module';
import { DATABASE_CONFIG } from './config/database.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>(DATABASE_CONFIG),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}

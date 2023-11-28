import { ApiProperty } from '@nestjs/swagger';
import { InputType, Field } from '@nestjs/graphql';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '../../common/enums';

@InputType()
export class CreateUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Field()
  firstName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Field()
  username: string;

  @Expose()
  @IsEmail()
  @ApiProperty({
    default: 'email@email.org',
  })
  @Field()
  email: string;

  @Expose()
  @IsString()
  @MinLength(6)
  @ApiProperty()
  @Field()
  password: string;

  @Exclude()
  id: string;

  @Exclude()
  role: Role;
}

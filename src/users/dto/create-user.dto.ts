import { Exclude, Expose } from 'class-transformer';
import { Role } from '../entities/role.enum';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @Expose()
  @IsEmail()
  @ApiProperty({
    default: 'email@email.com',
  })
  email: string;

  @Expose()
  @IsString()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @Exclude()
  id: string;

  @Exclude()
  role: Role;
}

import { Exclude, Expose } from 'class-transformer';
import { Role } from '../entities/role.enum';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  @MinLength(6)
  password: string;

  @Exclude()
  id: string;

  @Exclude()
  role: Role;
}

import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '../../common/enums';

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
    default: 'email@email.org',
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

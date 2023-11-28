import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../common/enums';

export class UserDto {
  @Expose()
  @ApiProperty()
  id: string;

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
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty()
  role: Role;
}

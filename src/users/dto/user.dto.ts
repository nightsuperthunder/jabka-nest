import { Expose } from 'class-transformer';
import { Role } from '../entities/role.enum';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @Expose()
  id: string;
  @Expose()
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @Expose()
  @IsString()
  @IsNotEmpty()
  username: string;
  @Expose()
  role: Role;
}

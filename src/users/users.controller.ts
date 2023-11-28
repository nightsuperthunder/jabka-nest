import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  TransformResponseInterceptor,
  TransformRequestInterceptor,
} from '../common/interceptors';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../common/guards';
import { UsersService } from './users.service';
import { UpdateUserDto, UserDto } from './dto';
import { Roles } from '../common/decorator';
import { Role } from '../common/enums';

@Roles(Role.Admin, Role.Moderator)
@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Users')
@Controller('api/users')
@UseInterceptors(new TransformResponseInterceptor(UserDto))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('/user/:id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findOneById(id);
  }

  @Patch('/user/:id')
  @UseInterceptors(new TransformRequestInterceptor(UpdateUserDto))
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Roles(Role.Admin)
  @Delete('/user/:id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.remove(id);
  }

  @Roles(Role.User)
  @Get('/me')
  async getMe(@Req() request: Request) {
    const { sub } = request['user'];
    return await this.usersService.findOneById(sub);
  }
}

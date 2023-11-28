import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  TransformResponseInterceptor,
  TransformRequestInterceptor,
} from '../common/interceptors';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../common/guards';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';
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
  @UseInterceptors(new TransformRequestInterceptor(CreateUserDto))
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findOneById(id);
  }

  @Patch(':id')
  @UseInterceptors(new TransformRequestInterceptor(UpdateUserDto))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}

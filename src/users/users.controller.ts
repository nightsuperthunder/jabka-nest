import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { TransformResponseInterceptor } from '../common/interceptors/transform-response.interceptor';
import { UsersService } from './users.service';
import { UserDto, CreateUserDto, UpdateUserDto } from './dto';
import { TransformRequestInterceptor } from '../common/interceptors/transform-request.interceptor';

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
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(new TransformRequestInterceptor(UpdateUserDto))
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

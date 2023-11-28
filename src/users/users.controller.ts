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
import { TransformResponseInterceptor } from '../common/interceptors/transform-response.interceptor';
import { TransformRequestInterceptor } from '../common/interceptors/transform-request.interceptor';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';
import { UserDto, CreateUserDto, UpdateUserDto } from './dto';

@UseGuards(AuthGuard)
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
  findAll() {
    return this.usersService.findAll();
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}

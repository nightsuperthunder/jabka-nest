import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseInterceptors } from '@nestjs/common';
import { TransformResponseInterceptor } from '../common/interceptors';
import { CreateUserDto, UserDto } from './dto';

@Resolver()
@UseInterceptors(new TransformResponseInterceptor(UserDto))
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query(() => [User])
  async findAll() {
    return await this.usersService.findAll();
  }

  @Query(() => User)
  async findOne(@Args('id') id: string) {
    return await this.usersService.findOneById(id);
  }

  @Mutation(() => User)
  // @UseInterceptors(new TransformRequestInterceptor(CreateUserDto)) //todo: nya
  async create(@Args('user') user: CreateUserDto) {
    console.log(user);
    return this.usersService.create(user);
  }
}

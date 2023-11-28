import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Not, Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    const user = await this.usersRepository.findOne({ where: { username } });

    if (user) {
      throw new ForbiddenException('User already exist');
    }

    const passwordHash = await this.hashPassword(password);

    const newUser = { ...createUserDto, passwordHash };
    const createdUser = this.usersRepository.create(newUser);
    return await this.usersRepository.save(createdUser);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOneById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByUsername(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { username } = updateUserDto;
    const isUsernameExist = !!(await this.usersRepository.findOne({
      where: { id: Not(id), username },
    }));
    if (isUsernameExist) {
      throw new ForbiddenException('User already exist');
    }

    const { password } = updateUserDto;
    if (password) {
      user.passwordHash = await this.hashPassword(password);
    }

    Object.assign(user, updateUserDto);

    return await this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.usersRepository.remove(user);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
}

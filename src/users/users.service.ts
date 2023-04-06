import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User();
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);

      user.email = createUserDto.email;
      user.password = hashedPassword;
      user.username = createUserDto.username;

      await user.save();
      delete user.password;

      return user;
    } catch {
      throw new ConflictException('User already exists');
    }
  }

  async findAll() {
    const users = await this.usersRepository.find().then((users) =>
      users.map((user) => {
        delete user.password;

        return user;
      })
    );

    return users;
  }

  async findOne(id: number) {
    try {
      const user = await this.usersRepository.findOneByOrFail({ id });
      delete user.password;

      return user;
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { firstName, lastName, username, email, password, bio, birthdayDate, phone } = updateUserDto;

    try {
      const user = await this.usersRepository.findOneByOrFail({ id });

      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      user.username = username;
      user.bio = bio;
      user.birthdayDate = birthdayDate;
      user.phone = phone;

      if (password) {
        const { password: hashedPassword } = await user.setPassword(password);
        user.password = hashedPassword;
      }

      await user.save();

      delete user.password;

      return user;
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('User already exists');
      }

      throw new NotFoundException('User not found');
    }
  }

  async remove(id: number) {
    try {
      const user = await this.usersRepository.findOneByOrFail({ id });

      await this.usersRepository.delete(id);
      delete user.password;

      return user;
    } catch {
      throw new NotFoundException('User not found');
    }
  }
}

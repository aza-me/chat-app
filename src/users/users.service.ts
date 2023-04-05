import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, roundsOfHashing);
    createUserDto.password = hashedPassword;

    return this.prisma.user.create({ data: createUserDto });
  }

  async findMany(where?: Prisma.UserWhereInput) {
    const users = await this.prisma.user.findMany({ where }).then((data) => {
      data.forEach((user) => {
        delete user.password;
      });

      return data;
    });

    return users;
  }

  findOne(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUniqueOrThrow({ where });
  }

  async update(where: Prisma.UserWhereUniqueInput, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, roundsOfHashing);
    }

    return this.prisma.user.update({
      where,
      data: updateUserDto,
    });
  }

  delete(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({ where });
  }
}

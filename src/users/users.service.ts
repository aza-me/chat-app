import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserType } from './types/user.type';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.UserUncheckedCreateInput): Promise<UserType> {
    return this.prisma.user.create({ data });
  }

  findMany(where?: Prisma.UserWhereInput): Promise<UserType[]> {
    return this.prisma.user.findMany({ where });
  }

  findOne(where: Prisma.UserWhereUniqueInput): Promise<UserType> {
    return this.prisma.user.findUniqueOrThrow({ where });
  }

  update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<UserType> {
    return this.prisma.user.update({ data, where });
  }

  delete(where: Prisma.UserWhereUniqueInput): Promise<UserType> {
    return this.prisma.user.delete({ where });
  }
}

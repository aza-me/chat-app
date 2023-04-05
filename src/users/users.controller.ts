import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Res, HttpStatus, Patch, Put } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { responseTemplate } from 'common/templates/response-template';
import prismaErrorHandler from 'common/utils/prisma-error-handler';
import { UserEntity } from './entities/user.entity';

const name = 'users';

@Controller(name)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);

      res.status(200).send(responseTemplate({ data: user }));
    } catch (e) {
      const { messages, statusCode } = prismaErrorHandler(e);
      res.status(statusCode).send(responseTemplate({ messages, success: false }));
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    const users = await this.usersService.findMany();
    res.status(HttpStatus.OK).send(responseTemplate({ data: users }));
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne({ id });
      res.status(HttpStatus.OK).send(responseTemplate({ data: user }));
    } catch (e) {
      res.status(HttpStatus.NOT_FOUND).send(responseTemplate({ success: false }));
    }
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Res() res: Response, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = new UserEntity(await this.usersService.update({ id }, updateUserDto));
      res.status(HttpStatus.OK).send(responseTemplate({ data: user }));
    } catch (e) {
      const { messages, statusCode } = prismaErrorHandler(e);
      res.status(statusCode).send(responseTemplate({ messages, success: false }));
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const user = await this.usersService.delete({ id });
      res.status(HttpStatus.OK).send(responseTemplate({ data: user }));
    } catch (e) {
      res.status(HttpStatus.NOT_FOUND).send(responseTemplate({ success: false }));
    }
  }
}

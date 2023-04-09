import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import responseTemplate from 'common/templates/responseTemplate';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import removeKeys from 'common/helpers/remove-keys';
import { JwtAuthGuard } from 'auth/strategies/jwt-auth.guard';

@Controller('users')
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return responseTemplate({ data: removeKeys(user, ['password']), statusCode: HttpStatus.CREATED });
  }

  @Get()
  @ApiOkResponse({ type: [User] })
  async findAll() {
    const users = await this.usersService.findAll().then((data) => {
      return data.map((user) => {
        return removeKeys(user, ['password']);
      });
    });

    return responseTemplate({
      data: users,
      statusCode: HttpStatus.OK,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: User })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne({ id });

    return responseTemplate({ data: removeKeys(user, ['password']), statusCode: HttpStatus.OK });
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ type: User })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto);

    return responseTemplate({ data: removeKeys(user, ['password']), statusCode: HttpStatus.OK });
  }

  @Delete(':id')
  @ApiOkResponse({ type: User })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.remove(id);

    return responseTemplate({ data: removeKeys(user, ['password']), statusCode: HttpStatus.OK });
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import responseTemplate from 'common/templates/responseTemplate';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.usersService.create(createUserDto);
    return responseTemplate({ data, statusCode: HttpStatus.CREATED });
  }

  @Get()
  @ApiOkResponse({ type: [User] })
  async findAll() {
    const data = await this.usersService.findAll();
    return responseTemplate({ data, statusCode: HttpStatus.OK });
  }

  @Get(':id')
  @ApiOkResponse({ type: User })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.usersService.findOne(id);
    return responseTemplate({ data, statusCode: HttpStatus.OK });
  }

  @Patch(':id')
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse({ type: User })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.usersService.update(id, updateUserDto);
    return responseTemplate({ data, statusCode: HttpStatus.OK });
  }

  @Delete(':id')
  @ApiOkResponse({ type: User })
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.usersService.remove(id);
    return responseTemplate({ data, statusCode: HttpStatus.OK });
  }
}

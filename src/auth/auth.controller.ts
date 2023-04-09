import { Controller, Post, Body, HttpStatus, UseGuards, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import responseTemplate from 'common/templates/responseTemplate';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { UsersService } from 'users/users.service';
import { User } from 'users/entities/user.entity';
import removeKeys from 'common/helpers/remove-keys';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { user, accessToken } = await this.authService.login(loginDto);

    return responseTemplate({ data: user, accessToken, success: true, statusCode: HttpStatus.OK });
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const registerData = await this.usersService.create(createUserDto);
    const { user, accessToken } = await this.authService.register(registerData);

    return responseTemplate({ data: user, accessToken, success: true, statusCode: HttpStatus.CREATED });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const { id } = req.user as User;
    const user = await this.usersService.findOne({ id });

    return responseTemplate({ data: removeKeys(user, ['password']), success: true, statusCode: 200 });
  }
}

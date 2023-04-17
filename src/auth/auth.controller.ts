import { Controller, Post, Body, HttpStatus, UseGuards, Get, Req, HttpCode } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import responseTemplate from 'common/templates/responseTemplate';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { UsersService } from 'users/users.service';
import { User } from 'users/entities/user.entity';
import { removeUserKeys } from 'common/helpers/remove-keys';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ConfirmUserDto } from 'users/dto/confirm-user.dto';
import { ResendCodeUserDto } from 'users/dto/resend-code-user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    const { user, accessToken } = await this.authService.login(loginDto);

    return responseTemplate({ data: user, accessToken, success: true, statusCode: HttpStatus.OK });
  }

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  async register(@Body() createUserDto: CreateUserDto) {
    await this.authService.register(createUserDto);

    return responseTemplate({
      message: 'Verification code sent to your email',
      success: true,
      statusCode: HttpStatus.CREATED,
    });
  }

  @Post('confirm-code')
  @ApiBody({ type: ConfirmUserDto })
  async confirmVerificationCode(@Body() confirmUserDto: ConfirmUserDto) {
    const { user, accessToken } = await this.authService.confirmVerificationCode(confirmUserDto);

    return responseTemplate({ data: user, accessToken, success: true, statusCode: HttpStatus.OK });
  }

  @Post('resend-code')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ConfirmUserDto })
  async resendVerificationCode(@Body() resendCodeUserDto: ResendCodeUserDto) {
    await this.authService.resendVerificationCode(resendCodeUserDto);

    return responseTemplate({
      message: 'Verification code sent to your email',
      success: true,
      statusCode: HttpStatus.OK,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: User })
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const { id } = req.user as User;
    const user = await this.usersService.findOne({ id });

    return responseTemplate({ data: removeUserKeys(user), success: true, statusCode: 200 });
  }
}

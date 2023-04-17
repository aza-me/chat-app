import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'users/users.service';
import { LoginDto } from './dto/login.dto';
import { removeUserKeys } from 'common/helpers/remove-keys';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { ConfirmUserDto } from 'users/dto/confirm-user.dto';
import { ResendCodeUserDto } from 'users/dto/resend-code-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    try {
      const user = await this.usersService.findOne({ email: loginDto.email });
      const isValidPassword = await bcrypt.compare(loginDto.password, user.password);

      if (!isValidPassword) {
        throw new UnauthorizedException('Email or password invalid');
      }

      if (!user.verified) {
        throw new UnauthorizedException('User email not verified');
      }

      const accessToken = await this.jwtService.signAsync({ id: user.id, email: user.email, username: user.username });

      return {
        user: removeUserKeys(user),
        accessToken,
      };
    } catch (e) {
      throw new UnauthorizedException('Email or password invalid');
    }
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    await this.usersService.getVerificationCodeForUser(user.email);

    return true;
  }

  async confirmVerificationCode(confirmUserDto: ConfirmUserDto) {
    const user = await this.usersService.findOne({ email: confirmUserDto.email });

    await this.usersService.confirmUser(user, confirmUserDto.verificationCode);

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    return {
      user: removeUserKeys(user),
      accessToken,
    };
  }

  async resendVerificationCode(resendCodeUserDto: ResendCodeUserDto) {
    const user = await this.usersService.findOne({ email: resendCodeUserDto.email });

    if (user.verified) {
      throw new ConflictException(`User's email already confirmed`);
    }

    await this.usersService.getVerificationCodeForUser(user.email);
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'users/users.service';
import { LoginDto } from './dto/login.dto';
import removeKeys from 'common/helpers/remove-keys';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { User } from 'users/entities/user.entity';

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

      const accessToken = await this.jwtService.signAsync({ id: user.id, email: user.email, username: user.username });

      return {
        user: removeKeys(user, ['password']),
        accessToken,
      };
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Email or password invalid');
    }
  }

  async register(user: User) {
    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    return {
      user: removeKeys(user, ['password']),
      accessToken,
    };
  }
}

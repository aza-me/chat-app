import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(loginDto: LoginDto) {
    try {
      const data = await this.usersService.findOne({ email: loginDto.email });
      const isValidPassword = await bcrypt.compare(loginDto.password, data.password);

      if (!isValidPassword) {
        throw new UnauthorizedException('Email or password invalid');
      }

      const accessToken = await this.jwtService.signAsync({ id: data.id, email: data.email, password: data.password });

      return {
        data,
        accessToken,
      };
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Email or password invalid');
    }
  }
}

import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as otpGenerator from 'otp-generator';
import * as moment from 'moment';
import { ConfirmUserDto } from './dto/confirm-user.dto';

const saltOrRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User();
      const hashedPassword = await bcrypt.hash(createUserDto.password, saltOrRounds);

      user.email = createUserDto.email;
      user.password = hashedPassword;
      user.username = createUserDto.username;

      await user.save();

      return user;
    } catch {
      throw new ConflictException('User already exists');
    }
  }

  async findAll() {
    const users = await this.usersRepository.find();

    return users;
  }

  async findOne(userData: FindOptionsWhere<User>) {
    try {
      return await this.usersRepository.findOneByOrFail(userData);
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { firstName, lastName, username, email, password, bio, birthdayDate, phone } = updateUserDto;

    try {
      const user = await this.usersRepository.findOneByOrFail({ id });

      user.email = email ?? user.email;
      user.firstName = firstName ?? user.firstName;
      user.lastName = lastName ?? user.lastName;
      user.username = username ?? user.username;
      user.bio = bio ?? user.bio;
      user.birthdayDate = birthdayDate ?? user.birthdayDate;
      user.phone = phone ?? user.phone;

      if (password) {
        const { password: hashedPassword } = await user.setPassword(password);
        user.password = hashedPassword;
      }

      await user.save();

      return user;
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('User already exists');
      }

      throw new NotFoundException('User not found');
    }
  }

  async remove(id: number) {
    try {
      const user = await this.usersRepository.findOneByOrFail({ id });
      await this.usersRepository.delete(id);

      return user;
    } catch {
      throw new NotFoundException('User not found');
    }
  }

  async getVerificationCodeForUser(email: string) {
    const user = await this.findOne({ email });
    const verificationCode = await this.genVerificationCode();

    user.verificationCode = verificationCode;
    user.verificationCreatedAt = new Date();

    await user.save();

    // TODO: send
    return verificationCode;
  }

  async genVerificationCode(): Promise<string> {
    return otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });
  }

  async confirmUser(confirmUserDto: ConfirmUserDto, verificationCode: string) {
    const user = await this.findOne({ email: confirmUserDto.email });

    if (user.verified) {
      throw new ConflictException(`User's email already confirmed`);
    }

    await this.validateVerificationCode(user, verificationCode);

    user.verificationCode = null;
    user.verificationCreatedAt = null;
    user.verified = true;

    await user.save();
  }

  async validateVerificationCode(user: User, verificationCode: string) {
    if (user.verificationCode !== verificationCode) {
      throw new UnprocessableEntityException('Verification code incorrect');
    }

    if (moment().unix() - moment(user.verificationCreatedAt).unix() > 180) {
      throw new UnprocessableEntityException('Verification code expired');
    }
  }
}

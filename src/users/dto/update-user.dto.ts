import { IsString, MaxLength, IsPhoneNumber, IsDateString } from 'class-validator';
import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PickType(CreateUserDto, ['email', 'password']) {
  @IsString()
  @MaxLength(20)
  username: string;

  @IsString()
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MaxLength(20)
  lastName: string;

  @IsPhoneNumber()
  @IsString()
  phone: string;

  @IsString()
  @MaxLength(200)
  bio: string;

  @IsDateString()
  birthdayDate: Date;
}

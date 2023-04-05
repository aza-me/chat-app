import { IsString, MaxLength, IsPhoneNumber, IsDate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  @IsString()
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MaxLength(20)
  lastName: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  @MaxLength(200)
  bio: string;

  @IsDate()
  birthdayDate: Date;
}

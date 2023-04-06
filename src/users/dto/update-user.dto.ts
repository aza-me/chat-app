import { Exclude } from 'class-transformer';
import { IsString, IsPhoneNumber, IsDateString, MaxLength, IsOptional, MinLength, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(4)
  username: string;

  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  firstName: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  lastName: string;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  bio: string;

  @IsOptional()
  @IsDateString()
  birthdayDate: Date;

  @Exclude()
  createdDate: Date;

  @Exclude()
  updatedDate: Date;
}

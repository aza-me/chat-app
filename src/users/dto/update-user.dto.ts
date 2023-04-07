import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsString, IsPhoneNumber, IsDateString, MaxLength, IsOptional, MinLength, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(4)
  username: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(200)
  bio: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  birthdayDate: Date;

  @Exclude()
  createdDate: Date;

  @Exclude()
  updatedDate: Date;
}

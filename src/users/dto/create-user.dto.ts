import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(4)
  username: string;
}

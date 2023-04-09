import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ required: true })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @MinLength(8)
  password: string;
}

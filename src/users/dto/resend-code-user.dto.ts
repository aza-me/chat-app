import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ResendCodeUserDto {
  @ApiProperty({ required: true })
  @IsEmail()
  @IsString()
  email: string;
}

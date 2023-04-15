import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class ConfirmUserDto {
  @ApiProperty({ required: true })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @Length(6, 6)
  verificationCode: string;
}

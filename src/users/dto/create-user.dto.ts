import { Length, IsString, IsNotEmpty, MaxLength, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(20)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8)
  password: string;
}

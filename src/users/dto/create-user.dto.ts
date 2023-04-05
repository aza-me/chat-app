import { Length, IsEmail, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(30)
  @IsString()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 64)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  username: string;
}

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
  phone: string;
  bio: string;
  birthdayDate: Date;
  createdDate: Date;
  updatedDate: Date;
}

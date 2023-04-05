import { CommonEntity } from 'src/common/entities/common.entity';
import { UserType } from '../types/user.type';

export class UserEntity extends CommonEntity implements UserType {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
  birthdayDate: Date;
}

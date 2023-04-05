import { CommonEntity } from 'common/entities/common.entity';
import { User } from '@prisma/client';

export class UserEntity extends CommonEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }

  email: string;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  bio: string;
  birthdayDate: Date;
  password: string;
}

import { User } from 'users/entities/user.entity';

export const removeKeys = <T>(data: T, keys: Array<keyof T>) => {
  keys.forEach((key) => {
    delete data[key];
  });

  return data;
};

export const removeUserKeys = (
  user: User,
  keys: Array<keyof User> = ['password', 'verificationCode', 'verificationCreatedAt']
) => {
  return removeKeys(user, keys);
};

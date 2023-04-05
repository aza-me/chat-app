import { UserEntity } from 'users/entities/user.entity';

const getUserResponse = (user: UserEntity) => {
  const userResponse = { ...user };

  delete userResponse.password;

  return userResponse;
};

export default getUserResponse;

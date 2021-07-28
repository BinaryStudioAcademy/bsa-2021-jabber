import { hash } from 'bcrypt';
import { USER_PASSWORD_SALT_ROUNDS } from '~/common/constants/constants';

const encrypt = (data: string): Promise<string> => {
  return hash(data, USER_PASSWORD_SALT_ROUNDS);
};

export { encrypt };

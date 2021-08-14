import { User } from 'common/types/types';
import { UserFormPayload } from 'common/types/user/user-form-payload.type';

const mapUserToFormPayload = (user: User): UserFormPayload => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  nickname: user.nickname,
  birthdate: new Date(user.birthdate),
});

export { mapUserToFormPayload };

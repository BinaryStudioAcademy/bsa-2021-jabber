import { User } from 'common/types/types';
import { UserEditFormPayload } from 'common/types/types';

const mapUserToFormPayload = (user: User): UserEditFormPayload => ({
  firstName: user.firstName,
  lastName: user.lastName,
  email: user.email,
  nickname: user.nickname,
  birthdate: new Date(user.birthdate),
  bio: user.bio,
  image: null,
});

export { mapUserToFormPayload };

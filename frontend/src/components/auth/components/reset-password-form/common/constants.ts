import { UserPayloadKey } from 'common/enums/enums';
import { UserResetPasswordPayload } from 'common/types/types';

const DEFAULT_RESET_PASSWORD_PAYLOAD: UserResetPasswordPayload = {
  [UserPayloadKey.EMAIL]: 'a@a.a',
};

export { DEFAULT_RESET_PASSWORD_PAYLOAD };

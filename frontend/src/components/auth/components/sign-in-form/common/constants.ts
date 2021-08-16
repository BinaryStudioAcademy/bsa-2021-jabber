import { UserPayloadKey } from 'common/enums/enums';
import { UserSignInPayload } from 'common/types/types';

const DEFAULT_LOGIN_PAYLOAD: UserSignInPayload = {
  [UserPayloadKey.EMAIL]: '',
  [UserPayloadKey.PASSWORD]: '',
};

export { DEFAULT_LOGIN_PAYLOAD };

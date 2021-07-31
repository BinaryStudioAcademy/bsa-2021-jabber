import { UserSignInPayloadKey } from 'common/enums/enums';
import { UserSignInPayload } from 'common/types/types';

const DEFAULT_LOGIN_PAYLOAD: UserSignInPayload = {
  [UserSignInPayloadKey.EMAIL]: '',
  [UserSignInPayloadKey.PASSWORD]: '',
};

export { DEFAULT_LOGIN_PAYLOAD };

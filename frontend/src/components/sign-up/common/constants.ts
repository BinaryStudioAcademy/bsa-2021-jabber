import { UserCreatePayloadKey } from 'common/enums/enums';
import { UserCreatePayload } from 'common/types/types';

const DEFAULT_REGISTER_PAYLOAD: UserCreatePayload = {
  [UserCreatePayloadKey.FIRST_NAME]: '',
  [UserCreatePayloadKey.LAST_NAME]: '',
  [UserCreatePayloadKey.NICKNAME]: '',
  [UserCreatePayloadKey.EMAIL]: '',
  [UserCreatePayloadKey.BIRTHDATE]: '',
};

export { DEFAULT_REGISTER_PAYLOAD };

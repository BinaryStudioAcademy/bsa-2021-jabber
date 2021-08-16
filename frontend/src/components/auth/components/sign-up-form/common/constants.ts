import { UserPayloadKey } from 'common/enums/enums';
import { UserCreatePayload } from 'common/types/types';

const DEFAULT_REGISTER_PAYLOAD: UserCreatePayload = {
  [UserPayloadKey.FIRST_NAME]: '',
  [UserPayloadKey.LAST_NAME]: '',
  [UserPayloadKey.NICKNAME]: '',
  [UserPayloadKey.EMAIL]: '',
  [UserPayloadKey.PASSWORD]: '',
  [UserPayloadKey.BIRTHDATE]: '',
};

export { DEFAULT_REGISTER_PAYLOAD };

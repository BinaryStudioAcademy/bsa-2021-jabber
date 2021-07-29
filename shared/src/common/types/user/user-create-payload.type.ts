import { UserCreatePayloadKey } from '~/common/enums/enums';

type UserCreatePayload = {
  [UserCreatePayloadKey.FIRST_NAME]: string;
  [UserCreatePayloadKey.LAST_NAME]: string;
  [UserCreatePayloadKey.EMAIL]: string;
  [UserCreatePayloadKey.PASSWORD]: string;
  [UserCreatePayloadKey.NICKNAME]: string;
  [UserCreatePayloadKey.BIRTHDATE]: string;
};

export type { UserCreatePayload };

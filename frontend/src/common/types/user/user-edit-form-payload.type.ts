import { UserPayloadKey } from 'common/enums/enums';

type UserEditFormPayload = {
  [UserPayloadKey.FIRST_NAME]: string;
  [UserPayloadKey.LAST_NAME]: string;
  [UserPayloadKey.NICKNAME]: string;
  [UserPayloadKey.EMAIL]: string;
  [UserPayloadKey.BIO]: string;
  [UserPayloadKey.BIRTHDATE]: Date;
  [UserPayloadKey.IMAGE]: FileList | null;
};

export type { UserEditFormPayload };

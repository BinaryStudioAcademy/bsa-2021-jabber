import { UserPayloadKey } from '~/common/enums/enums';

type UserEditDTOPayload = {
  [UserPayloadKey.FIRST_NAME]: string;
  [UserPayloadKey.LAST_NAME]: string;
  [UserPayloadKey.NICKNAME]: string;
  [UserPayloadKey.EMAIL]: string;
  [UserPayloadKey.BIRTHDATE]: string;
  [UserPayloadKey.BIO]: string;
  [UserPayloadKey.IMAGE_ID]: number | null;
};

export type { UserEditDTOPayload };

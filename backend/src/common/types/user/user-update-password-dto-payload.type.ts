import { UserPayloadKey } from '~/common/enums/enums';

type UserUpdatePasswordDTOPayload = {
  [UserPayloadKey.PASSWORD]: string;
};

export type { UserUpdatePasswordDTOPayload };

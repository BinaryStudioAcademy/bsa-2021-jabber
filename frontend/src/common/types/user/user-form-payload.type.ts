import { UserPayloadKey } from 'common/enums/enums';
import { UserEditPayload } from 'jabber-shared/common/types/types';

type UserFormPayload = Omit<UserEditPayload, UserPayloadKey.BIRTHDATE> & {
  [UserPayloadKey.BIRTHDATE]: Date;
};

export type { UserFormPayload };

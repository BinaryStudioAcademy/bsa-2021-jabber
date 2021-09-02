import { UserPayloadKey } from '~/common/enums/enums';
import { User } from 'jabber-shared/common/types/types';

type UserWithPasswordPayload = User & {
  [UserPayloadKey.PASSWORD]: string;
};

export type { UserWithPasswordPayload };

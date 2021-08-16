import { UserPayloadKey } from '~/common/enums/enums';
import { UserPayload } from './user-payload.type';

type UserSignInPayload = UserPayload & {
  [UserPayloadKey.PASSWORD]: string;
};

export type { UserSignInPayload };

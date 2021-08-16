import { UserPayloadKey } from '~/common/enums/enums';
import { UserConfigurePayload } from './user-configure-payload.type';

type UserCreatePayload = UserConfigurePayload & {
  [UserPayloadKey.PASSWORD]: string;
};

export type { UserCreatePayload };

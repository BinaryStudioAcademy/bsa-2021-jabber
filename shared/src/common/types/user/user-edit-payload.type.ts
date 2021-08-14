import { UserPayloadKey } from '~/common/enums/enums';
import { UserConfigurePayload } from './user-configure-payload.type';

type UserEditPayload = UserConfigurePayload & {
  [UserPayloadKey.PASSWORD]?: string;
};

export type { UserEditPayload };

import { UserPayloadKey } from '~/common/enums/enums';
import { UserConfigurePayload } from './user-configure-payload.type';

type UserEditPayload = UserConfigurePayload & {
  [UserPayloadKey.BIO]: string;
  [UserPayloadKey.IMAGE_DATA_URL]: string | null;
  [UserPayloadKey.IMAGE_ID]: number | null;
};

export type { UserEditPayload };

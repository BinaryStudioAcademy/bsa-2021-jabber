import { UserPayloadKey } from '~/common/enums/enums';

type UserResetPasswordPayload = {
  [UserPayloadKey.EMAIL]: string;
};

export type { UserResetPasswordPayload };

import { UserSignInPayloadKey } from '~/common/enums/enums';

type UserSignInPayload = {
  [UserSignInPayloadKey.EMAIL]: string;
  [UserSignInPayloadKey.PASSWORD]: string;
};

export type { UserSignInPayload };

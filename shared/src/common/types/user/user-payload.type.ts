import { UserPayloadKey } from '~/common/enums/enums';

type UserPayload = {
  [UserPayloadKey.EMAIL]: string;
};

export type { UserPayload };

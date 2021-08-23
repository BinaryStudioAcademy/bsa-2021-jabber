import { UserFollowerPayloadKey } from '~/common/enums/enums';

type UserFollowerPayload = {
  [UserFollowerPayloadKey.USER_ID]: number;
  [UserFollowerPayloadKey.FOLLOWER_ID]: number;
};

export type { UserFollowerPayload };

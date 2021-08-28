import { CommentCreatePayloadKey } from '~/common/enums/enums';

type CommentCreatePayload = {
  [CommentCreatePayloadKey.TEXT]: string;
  [CommentCreatePayloadKey.USER_ID]: number;
  [CommentCreatePayloadKey.EPISODE_ID]: number;
  [CommentCreatePayloadKey.TIMESTAMP]: number;
};

export type { CommentCreatePayload };

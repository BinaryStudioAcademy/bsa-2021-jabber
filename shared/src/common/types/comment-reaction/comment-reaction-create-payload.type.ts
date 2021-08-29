import { CommentReactionCreatePayloadKey } from '~/common/enums/enums';

type CommentReactionCreatePayload = {
  [CommentReactionCreatePayloadKey.USER_ID]: number;
  [CommentReactionCreatePayloadKey.COMMENT_ID]: number;
};

export type { CommentReactionCreatePayload };

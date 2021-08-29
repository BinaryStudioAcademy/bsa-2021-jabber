import { CommentReactionCreatePayloadKey } from 'common/enums/enums';

type CommentReactionCreatePayload = {
  [CommentReactionCreatePayloadKey.COMMENT_ID]: number;
};

export type { CommentReactionCreatePayload };

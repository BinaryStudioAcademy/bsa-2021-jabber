import { CommentCreatePayloadKey } from '~/common/enums/enums';
import { CommentReaction } from '../comment-reaction/comment-reaction.type';

type CommentCreatePayload = {
  [CommentCreatePayloadKey.TEXT]: string;
  [CommentCreatePayloadKey.USER_ID]: number;
  [CommentCreatePayloadKey.EPISODE_ID]: number;
  [CommentCreatePayloadKey.TIMESTAMP]: number;
  [CommentCreatePayloadKey.COMMENT_REACTIONS]: CommentReaction[];
};

export type { CommentCreatePayload };

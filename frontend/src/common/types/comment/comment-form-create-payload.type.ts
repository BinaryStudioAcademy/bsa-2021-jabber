import { CommentCreatePayloadKey } from 'common/enums/enums';
import { CommentReaction } from '../comment-reaction/comment-reaction';

type CommentFormCreatePayload = {
  [CommentCreatePayloadKey.TEXT]: string;
  [CommentCreatePayloadKey.TIMESTAMP]: number;
  [CommentCreatePayloadKey.COMMENT_REACTIONS]: CommentReaction[];
};

export type { CommentFormCreatePayload };

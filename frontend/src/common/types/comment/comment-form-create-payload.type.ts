import { CommentCreatePayloadKey } from 'common/enums/enums';

type CommentFormCreatePayload = {
  [CommentCreatePayloadKey.TEXT]: string;
  [CommentCreatePayloadKey.TIMESTAMP]: number;
};

export type { CommentFormCreatePayload };

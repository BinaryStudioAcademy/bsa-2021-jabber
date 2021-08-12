import { CommentCreatePayloadKey } from 'common/enums/enums';
import { CommentFormCreatePayload } from 'common/types/types';

const DEFAULT_CREATE_COMMENT_PAYLOAD: CommentFormCreatePayload = {
  [CommentCreatePayloadKey.TEXT]: '',
  [CommentCreatePayloadKey.TIMESTAMP]: 0,
};

export { DEFAULT_CREATE_COMMENT_PAYLOAD };

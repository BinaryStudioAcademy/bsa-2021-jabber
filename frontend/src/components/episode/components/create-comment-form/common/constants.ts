import { CommentCreatePayloadKey } from 'common/enums/enums';
import { CommentCreatePayload } from 'common/types/types';
import { DEFAULT_USER_ID, DEFAULT_EPISODE_ID } from 'common/constants/constants';

const DEFAULT_CREATE_COMMENT_PAYLOAD: CommentCreatePayload = {
  [CommentCreatePayloadKey.TEXT]: '',
  [CommentCreatePayloadKey.USER_ID]: DEFAULT_USER_ID,
  [CommentCreatePayloadKey.EPISODE_ID]: DEFAULT_EPISODE_ID,
  [CommentCreatePayloadKey.TIMESTAMP]: 0,
};

export { DEFAULT_CREATE_COMMENT_PAYLOAD };

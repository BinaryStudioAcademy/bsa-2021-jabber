import { TableName, CommentDTOKey } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class Comment extends Abstract {
  [CommentDTOKey.TEXT]: string;

  [CommentDTOKey.USER_ID]: number;

  [CommentDTOKey.EPISODE_ID]: number;

  [CommentDTOKey.TIMESTAMP]: number;

  static get tableName(): string {
    return TableName.COMMENTS;
  }
}

export { Comment };

import { TableName, CommentReactionDTOKey } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class CommentReaction extends Abstract {
  [CommentReactionDTOKey.USER_ID]: number;

  [CommentReactionDTOKey.COMMENT_ID]: number;

  static get tableName(): string {
    return TableName.COMMENT_REACTIONS;
  }
}

export { CommentReaction };

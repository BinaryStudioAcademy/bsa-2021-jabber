import { Model } from 'objection';
import { TableName, CommentDTOKey } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';
import { User } from '../user/user.model';

class Comment extends Abstract {
  [CommentDTOKey.TEXT]: string;

  [CommentDTOKey.USER_ID]: number;

  [CommentDTOKey.EPISODE_ID]: number;

  [CommentDTOKey.TIMESTAMP]: number;

  [CommentDTOKey.USER]: User;

  static get tableName(): string {
    return TableName.COMMENTS;
  }

  static relationMappings = {
    user: {
      relation: Model.HasOneRelation,
      modelClass: User,
      join: {
        from: 'comments.userId',
        to: 'users.id',
      },
    },
  };
}

export { Comment };

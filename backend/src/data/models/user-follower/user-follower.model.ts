import { Model } from 'objection';
import {
  TableName,
  UserFollowerDTOKey,
} from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';
import { User } from '~/data/models/user/user.model';

class UserFollower extends Abstract {
  [UserFollowerDTOKey.USER_ID]: number;

  [UserFollowerDTOKey.FOLLOWER_ID]: number;

  [UserFollowerDTOKey.FOLLOWER]: User;

  static get tableName(): string {
    return TableName.USERS_FOLLOWERS;
  }

  static relationMappings = {
    user: {
      relation: Model.HasOneRelation,
      modelClass: User,
      join: {
        from: 'users_followers.follower_id',
        to: 'users.id',
      },
    },
  };
}

export { UserFollower };

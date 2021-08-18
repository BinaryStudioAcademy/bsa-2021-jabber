import {
  TableName,
  UserFollowerDTOKey,
  } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class UserNotification extends Abstract {
  [UserFollowerDTOKey.USER_ID]: number;

  [UserFollowerDTOKey.FOLLOWER_ID]: number;

  static get tableName(): string {
    return TableName.USERS_FOLLOWERS;
  }
}

export { UserNotification };

import { TableName, UserNotificationDTOKey } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class UserNotification extends Abstract {
  [UserNotificationDTOKey.USER_ID]: number;

  [UserNotificationDTOKey.NOTIFICATION_ID]: number;

  [UserNotificationDTOKey.IS_CHECKED]: boolean;

  static get tableName(): string {
    return TableName.USERS_NOTIFICATIONS;
  }
}

export { UserNotification };

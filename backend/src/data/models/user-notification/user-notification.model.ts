import { Model } from 'objection';
import {
  TableName,
  UserNotificationDTOKey,
  UserNotificationStatus,
} from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';
import { Notification } from '~/data/models/notification/notification.model';

class UserNotification extends Abstract {
  [UserNotificationDTOKey.USER_ID]: number;

  [UserNotificationDTOKey.NOTIFICATION_ID]: number;

  [UserNotificationDTOKey.STATUS]: UserNotificationStatus;

  [UserNotificationDTOKey.NOTIFICATION]: Notification;

  static get tableName(): string {
    return TableName.USERS_NOTIFICATIONS;
  }

  static relationMappings = {
    notification: {
      relation: Model.HasOneRelation,
      modelClass: Notification,
      join: {
        from: 'users_notifications.notification_id',
        to: 'notifications.id',
      },
    },
  };
}

export { UserNotification };

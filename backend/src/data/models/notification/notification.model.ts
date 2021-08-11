import { Abstract } from '../abstract/abstract.model';
import { TableName, NotificationDTOKey } from '~/common/enums/enums';

class Notification extends Abstract {
  [NotificationDTOKey.TITLE]: string;

  [NotificationDTOKey.TITLE]: string;

  static get tableName(): string {
    return TableName.NOTIFICATIONS;
  }
}

export { Notification };

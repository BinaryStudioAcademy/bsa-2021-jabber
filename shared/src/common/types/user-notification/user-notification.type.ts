import { UserNotificationStatus } from '~/common/enums/enums';
import { Notifications } from 'src/common/types/notification/notifications.type';

type UserNotification = {
  id: number;
  userId: number;
  notificationId: number;
  status: UserNotificationStatus;
  notifications : Notifications;
  createdAt: string;
  updatedAt: string;
};

export type { UserNotification };

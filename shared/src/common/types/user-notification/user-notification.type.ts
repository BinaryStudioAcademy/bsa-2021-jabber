import { UserNotificationStatus } from '~/common/enums/enums';
import { Notification } from '~/common/types/notification/notification.type';

type UserNotification = {
  id: number;
  userId: number;
  notificationId: number;
  status: UserNotificationStatus;
  notification: Notification;
  createdAt: string;
  updatedAt: string;
};

export type { UserNotification };

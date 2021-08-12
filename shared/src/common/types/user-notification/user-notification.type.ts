import { UserNotificationStatus } from '~/common/enums/enums';

type UserNotification = {
  id: number;
  userId: number;
  notificationId: number;
  status: UserNotificationStatus;
  createdAt: string;
  updatedAt: string;
};

export type { UserNotification };

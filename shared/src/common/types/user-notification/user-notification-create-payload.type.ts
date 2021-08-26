import { UserNotificationPayloadKey, UserNotificationStatus } from '~/common/enums/enums';

type UserNotificationCreatePayload = {
  [UserNotificationPayloadKey.USER_ID]: number;
  [UserNotificationPayloadKey.NOTIFICATION_ID]: number;
  [UserNotificationPayloadKey.STATUS]: UserNotificationStatus;
};

export type { UserNotificationCreatePayload };

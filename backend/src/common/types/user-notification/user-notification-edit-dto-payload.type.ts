import { UserNotificationDTOKey, UserNotificationStatus } from '~/common/enums/enums';

type UserNotificationEditDTOPayload = {
  [UserNotificationDTOKey.STATUS]: UserNotificationStatus,
};

export type { UserNotificationEditDTOPayload };

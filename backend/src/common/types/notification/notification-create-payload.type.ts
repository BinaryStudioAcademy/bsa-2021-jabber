import { NotificationCreatePayloadKey, NotificationTitle } from '~/common/enums/enums';

type NotificationCreatePayload = {
  [NotificationCreatePayloadKey.TITLE]: NotificationTitle;
  [NotificationCreatePayloadKey.MESSAGE]: string;
};

export type { NotificationCreatePayload };

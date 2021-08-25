import { NotificationCreatePayloadKey } from '~/common/enums/enums';

type NotificationCreatePayload = {
  [NotificationCreatePayloadKey.TITLE]: string;
  [NotificationCreatePayloadKey.MESSAGE]: string;
};

export type { NotificationCreatePayload };

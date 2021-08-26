import { NotificationModel as NotificationM } from '~/data/models/models';
import { Notification as TNotification, NotificationCreatePayload } from '~/common/types/types';

type Constructor = {
  NotificationModel: typeof NotificationM;
};

class Notification {
  #NotificationModel: typeof NotificationM;

  constructor({ NotificationModel }: Constructor) {
    this.#NotificationModel = NotificationModel;
  }

  public create(payload: NotificationCreatePayload): Promise<TNotification> {
    return this.#NotificationModel.query().insert(payload);
  }
}

export { Notification };

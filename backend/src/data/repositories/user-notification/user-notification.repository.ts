import { UserNotification as TUserNotification, UserNotificationCreatePayload } from '~/common/types/types';
import { UserNotificationModel as UserNotificationM } from '~/data/models/models';

type Constructor = {
  UserNotificationModel: typeof UserNotificationM;
};

class UserNotification {
  #UserNotificationModel: typeof UserNotificationM;

  constructor({ UserNotificationModel }: Constructor) {
    this.#UserNotificationModel = UserNotificationModel;
  }

  public create(payload: UserNotificationCreatePayload): Promise<TUserNotification> {
    return this.#UserNotificationModel.query().insert(payload);
  }
}

export { UserNotification };

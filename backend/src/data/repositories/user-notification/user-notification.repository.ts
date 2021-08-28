import {
  Notification as TNotification,
  UserNotification as TUserNotification,
  UserNotificationCreatePayload
} from '~/common/types/types';
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

  public getAllByUserId(id: number): Promise<TUserNotification[]>{
    return this.#UserNotificationModel.query()
      .where('user_id', id)
      .withGraphJoined('[notification]');
  }
}

export { UserNotification };

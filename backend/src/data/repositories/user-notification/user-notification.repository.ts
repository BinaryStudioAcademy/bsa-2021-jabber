import {
  UserNotification as TUserNotification,
  UserNotificationCreatePayload,
} from '~/common/types/types';
import { UserNotificationModel as UserNotificationM } from '~/data/models/models';
import { UserNotificationStatus } from '~/common/enums/enums';

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

  public getById(id: number): Promise<TUserNotification>{
    return this.#UserNotificationModel.query().findById(id);
  }

  public updateStatus(id: number, status: UserNotificationStatus): Promise<TUserNotification>{
    return this.#UserNotificationModel.query()
      .patchAndFetchById(id, { status }).withGraphFetched('[notification]');
  }
}

export { UserNotification };

import { UserNotification as TUserNotification } from '~/common/types/types';
import { UserNotificationStatus } from '~/common/enums/enums';
import { userNotification as userNotificationRep } from '~/data/repositories/repositories';

type Constructor = {
  userNotificationRepository: typeof userNotificationRep;
};

class UserNotification {
  #userNotificationRepository: typeof userNotificationRep;

  constructor({ userNotificationRepository }: Constructor) {
    this.#userNotificationRepository = userNotificationRepository;
  }

  public getAllByUserId(id: number): Promise<TUserNotification[]> {
    return this.#userNotificationRepository.getAllByUserId(id);
  }

  public async changeStatus(id: number):  Promise<TUserNotification> {
    const notification = await this.#userNotificationRepository.getById(id);

    const updatedStatus = notification.status === UserNotificationStatus.CHECKED
      ? UserNotificationStatus.UNCHECKED
      : UserNotificationStatus.CHECKED

    return this.#userNotificationRepository.updateStatus(id, updatedStatus);
  }
}

export { UserNotification };

import { UserNotification as TUserNotification } from '~/common/types/types';
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
}

export { UserNotification };

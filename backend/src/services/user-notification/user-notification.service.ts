import { UserNotificationEditDTOPayload, UserNotification as TUserNotification } from '~/common/types/types';
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

  public getCountUncheckedByUserId(id: number): Promise<number> {
    return this.#userNotificationRepository.getCountUncheckedByUserId(id);
  }

  public async update(id: number, { status }: TUserNotification):  Promise<TUserNotification> {
    const updateUserNotification: UserNotificationEditDTOPayload = { status };
    return this.#userNotificationRepository.update(id, updateUserNotification);
  }
}

export { UserNotification };

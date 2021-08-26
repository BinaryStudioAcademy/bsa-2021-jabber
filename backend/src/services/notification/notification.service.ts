import { Notification as TNotification, NotificationCreatePayload } from '~/common/types/types';
import { notification as notificationRep } from '~/data/repositories/repositories';

type Constructor = {
  notificationRepository: typeof notificationRep;
};

class Notification {
  #notificationRepository: typeof notificationRep;

  constructor({ notificationRepository }: Constructor) {
    this.#notificationRepository = notificationRepository;
  }

  public create(payload: NotificationCreatePayload): Promise<TNotification> {
    return this.#notificationRepository.create(payload);
  }
}

export { Notification };

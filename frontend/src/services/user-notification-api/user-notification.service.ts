import { ApiPath, HttpMethod, NotificationsApiPath } from 'common/enums/enums';
import { UserNotification } from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class UserNotificationApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAllById(): Promise<UserNotification[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.NOTIFICATIONS}${
        NotificationsApiPath.USER
      }`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public changeNotificationStatus(id: number): Promise<UserNotification> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.NOTIFICATIONS}/${id}${
        NotificationsApiPath.STATUS
      }`,
      {
        method: HttpMethod.PUT,
      },
    );
  }
}

export { UserNotificationApi };

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

  public getAllById(id: number): Promise<UserNotification[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.NOTIFICATIONS}${
        NotificationsApiPath.ROOT
      }${id}`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { UserNotificationApi };

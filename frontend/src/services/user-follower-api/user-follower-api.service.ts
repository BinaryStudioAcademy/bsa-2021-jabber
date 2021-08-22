import {
  ApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import { Http } from 'services/http/http.service';
import { UserFollower, UserFollowerPayload } from 'common/types/types';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class UserFollowerApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public isFollowed(payload: UserFollowerPayload): Promise<UserFollower> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.USER_FOLLOWERS}/${payload.userId}/${payload.followerId}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public create(payload: UserFollowerPayload): Promise<UserFollower> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.USER_FOLLOWERS}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public delete(payload: UserFollowerPayload): Promise<UserFollower> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.USER_FOLLOWERS}`,
      {
        method: HttpMethod.DELETE,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
}

export { UserFollowerApi };

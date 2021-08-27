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

  public getCountByUserId(userId: number): Promise<number> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.USER_FOLLOWERS}/${userId}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public checkIsFollowed(payload: UserFollowerPayload): Promise<boolean> {
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

  public getAllByUserId(userId: number): Promise<UserFollower[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.USER_FOLLOWERS}/${userId}/followers`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { UserFollowerApi };

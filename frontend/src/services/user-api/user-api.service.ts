import {
  ApiPath,
  HttpMethod,
  UsersApiPath,
} from 'common/enums/enums';
import { User } from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class UserApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getById(id: number): Promise<User> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.USERS}${UsersApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { UserApi };

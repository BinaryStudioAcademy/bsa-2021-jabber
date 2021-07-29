import {
  ApiPath,
  AuthApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import { User, UserCreatePayload } from 'common/types/user/user';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class AuthApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public signUp(payload: UserCreatePayload): Promise<User> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
}

export { AuthApi };

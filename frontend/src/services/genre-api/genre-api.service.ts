import {
  ApiPath,
  GenresApiPath,
  HttpMethod,
} from 'common/enums/enums';
import { Genre } from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class GenreApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAll(): Promise<Genre[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.GENRES}${GenresApiPath.ROOT}`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { GenreApi };

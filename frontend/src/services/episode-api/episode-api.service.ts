import {
  ApiPath,
  EpisodesApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import { Http } from 'services/http/http.service';
import { Episode, EpisodeCreatePayload } from 'common/types/types';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class EpisodeApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAll(): Promise<Episode[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.EPISODES}${EpisodesApiPath.ROOT}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public getById(id: number): Promise<Episode> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.EPISODES}${EpisodesApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public create(payload: EpisodeCreatePayload): Promise<Episode> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.EPISODES}${EpisodesApiPath.ROOT}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
}

export { EpisodeApi };

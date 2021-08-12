import {
  ApiPath,
  PodcastsApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import { Podcast, PodcastCreatePayload, PodcastEditPayload } from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class PodcastApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAll(): Promise<Podcast[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PODCASTS}${PodcastsApiPath.ROOT}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public getAllBySearch(searchValues: Record<string, unknown>): Promise<Podcast[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PODCASTS}${PodcastsApiPath.SEARCH}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(searchValues),
      },
    );
  }

  public getById(id: number): Promise<Podcast> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PODCASTS}${PodcastsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public create(payload: PodcastCreatePayload): Promise<Podcast> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PODCASTS}${PodcastsApiPath.ROOT}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public update(payload: PodcastEditPayload): Promise<Podcast> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PODCASTS}${PodcastsApiPath.ROOT}${payload.id}`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
}

export { PodcastApi };

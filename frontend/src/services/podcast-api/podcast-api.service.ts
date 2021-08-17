import {
  ApiPath,
  PodcastsApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import {
  Podcast,
  PodcastCreatePayload,
  PodcastEditPayload,
  PodcastSearchPayload,
} from 'common/types/types';
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

  public getAllBySearch(payload: PodcastSearchPayload): Promise<Podcast[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PODCASTS}${PodcastsApiPath.SEARCH}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
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

  public update(id: number, payload: PodcastEditPayload): Promise<Podcast> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PODCASTS}${PodcastsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public getAllByUserId(userId: number): Promise<Podcast[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PODCASTS}${PodcastsApiPath.USERS}/${userId}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public delete(id: number): Promise<Podcast> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PODCASTS}${PodcastsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.DELETE,
      },
    );
  }
}

export { PodcastApi };

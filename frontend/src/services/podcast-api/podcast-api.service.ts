import {
  ApiPath,
  ContentType,
  HttpMethod,
  PodcastsApiPath,
} from 'common/enums/enums';
import { Podcast, PodcastCreatePayload } from 'common/types/types';
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

  public postPodcast(payload: PodcastCreatePayload): Promise<Podcast> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PODCASTS}${PodcastsApiPath.ROOT}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
}

export { PodcastApi };

import {
  ApiPath,
  PodcastsApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import {
  PodcastFollower,
  PodcastFollowerPayload,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class PodcastFollowerApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getByPodcastId(id: number): Promise<PodcastFollower[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PODCAST_FOLLOWER}${PodcastsFollowerApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public create(payload: PodcastFollowerPayload): Promise<Podcast> {
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

export { PodcastFollowerApi };

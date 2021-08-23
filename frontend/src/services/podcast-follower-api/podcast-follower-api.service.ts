import {
  ApiPath,
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

  public getCountByPodcastId(podcastId: number): Promise<number> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PODCAST_FOLLOWERS}/${podcastId}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public checkIsFollowed(payload: PodcastFollowerPayload): Promise<boolean> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PODCAST_FOLLOWERS}/${payload.podcastId}/${payload.followerId}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public create(payload: PodcastFollowerPayload): Promise<PodcastFollower> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PODCAST_FOLLOWERS}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public delete(payload: PodcastFollowerPayload): Promise<PodcastFollower> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.PODCAST_FOLLOWERS}`,
      {
        method: HttpMethod.DELETE,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
}

export { PodcastFollowerApi };

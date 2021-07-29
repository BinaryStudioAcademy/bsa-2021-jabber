import { ContentType, HttpMethod } from 'common/enums/enums';
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

  public postPodcast(payload: any): Promise<any> {
    return this.#http.load(`${this.#apiPrefix}${'/podcasts'}${'/'}`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }
}

export { PodcastApi };

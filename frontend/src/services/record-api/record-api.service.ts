import { ApiPath, HttpMethod, RecordsApiPath } from 'common/enums/enums';
import { Record } from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class RecordApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getByEpisodeId(id: number): Promise<Record> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.RECORDS}${RecordsApiPath.EPISODE}/${id}`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { RecordApi };

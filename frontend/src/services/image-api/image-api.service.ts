import {
  ApiPath,
  FilesApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import { Http } from 'services/http/http.service';
import { Datauri } from 'services/datauri/datauri.service';

type Constructor = {
  http: Http;
  datauri: Datauri;
  apiPrefix: string;
};

type Result = {
  url: string;
  bytes: number;
};

class ImageApi {
  #http: Http;
  #datauri: Datauri;
  #apiPrefix: string;

  constructor({ http, datauri, apiPrefix }: Constructor) {
    this.#http = http;
    this.#datauri = datauri;
    this.#apiPrefix = apiPrefix;
  }

  public async uploadImage(file: File, userId = 1): Promise<Result> {
    const fileBase64 = await this.#datauri.getDatauri(file);
    const payload = {
      dataUrl: fileBase64,
      userId,
    };
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.FILES}${FilesApiPath.ROOT}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
}

export { ImageApi };

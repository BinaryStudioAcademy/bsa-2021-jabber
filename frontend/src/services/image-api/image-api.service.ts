import {
  ApiPath,
  ImagesApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import { Image, ImageUploadPayload } from 'common/types/types';
import { Http } from 'services/http/http.service';
import { Datauri } from 'services/datauri/datauri.service';
import { image as imageValidationSchema } from 'validation-schemas/validation-schemas';

type Constructor = {
  http: Http;
  datauri: Datauri;
  apiPrefix: string;
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

  public async uploadImage(file: File, userId = 1): Promise<Image> {
    const fileBase64 = await this.#datauri.getDatauri(file);

    const upload = {
      dataUrl: fileBase64,
      userId,
    };

    const { error } = imageValidationSchema.validate(upload);

    if (error) {
      return Promise.reject(error);
    } else {
      return this.createImage(upload);
    }
  }

  private async createImage(payload: ImageUploadPayload): Promise<Image> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.IMAGES}${ImagesApiPath.ROOT}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
}

export { ImageApi };

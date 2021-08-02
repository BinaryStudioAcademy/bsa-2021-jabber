import { HttpError } from 'exceptions/exceptions';
import { HttpHeader, HttpMethod, StorageKey } from 'common/enums/enums';
import { HttpOptions } from 'common/types/types';
import { GetHeadersProps } from './common/types/types';
import { storage as storageService } from '../services';

type Constructor = {
  storage: typeof storageService;
};

class Http {
  #storage: typeof storageService;

  constructor({ storage }: Constructor) {
    this.#storage = storage;
  }

  load<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
  ): Promise<T> {
    const { method = HttpMethod.GET, payload = null, contentType, hasAuth = true,
    } = options;
    const headers = this.getHeaders({
      contentType,
      hasAuth,
    });

    return fetch(url, {
      method,
      headers,
      body: payload,
    })
      .then(this.checkStatus)
      .then((res) => this.parseJSON<T>(res))
      .catch(this.throwError);
  }

  private getHeaders({ contentType, hasAuth }: GetHeadersProps): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    if (hasAuth) {
      const token = this.#storage.getItem(StorageKey.TOKEN);

      headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
    }

    return headers;
  }

  private async checkStatus(response: Response): Promise<Response> {
    if (!response.ok) {
      const parsedException = await response.json().catch(() => ({
        message: response.statusText,
      }));

      throw new HttpError({
        status: response.status,
        message: parsedException?.message,
      });
    }
    return response;
  }

  private parseJSON<T>(response: Response): Promise<T> {
    return response.json();
  }

  private throwError(err: Error): never {
    throw err;
  }
}

export { Http };

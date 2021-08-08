import {
  ApiPath,
  ContentType,
  HttpMethod,
  CommentsApiPath,
} from 'common/enums/enums';
import { Http } from 'services/http/http.service';
import { Comment, CommentCreatePayload } from 'common/types/types';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class CommentApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAll(): Promise<Comment[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COMMENTS}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public getById(id: number): Promise<Comment> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COMMENTS}${CommentsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public create(payload: CommentCreatePayload): Promise<Comment> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COMMENTS}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public getAllByEpisodeId(episodeId: number): Promise<Comment[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COMMENTS}${CommentsApiPath.EPISODE}/${episodeId}`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { CommentApi };

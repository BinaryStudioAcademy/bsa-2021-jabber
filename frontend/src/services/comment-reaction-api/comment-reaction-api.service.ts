import {
  ApiPath,
  ContentType,
  HttpMethod,
} from 'common/enums/enums';
import { Http } from 'services/http/http.service';
import { CommentReaction, CommentReactionCreatePayload } from 'common/types/types';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class CommentReactionApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getCommentReactions(commentId: number): Promise<CommentReaction[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COMMENT_REACTIONS}/${commentId}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public create(payload: CommentReactionCreatePayload): Promise<CommentReaction> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COMMENT_REACTIONS}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }
}

export { CommentReactionApi };

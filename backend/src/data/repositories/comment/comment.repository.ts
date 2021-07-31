import { CommentModel as CommentM } from '~/data/models/models';
import { Comment as TComment, CommentCreatePayload } from '~/common/types/types';

type Constructor = {
  CommentModel: typeof CommentM;
};

class Comment {
  #CommentModel: typeof CommentM;

  constructor({ CommentModel }: Constructor) {
    this.#CommentModel = CommentModel;
  }

  public getAll(): Promise<TComment[]> {
    return this.#CommentModel.query();
  }

  public create(payload: CommentCreatePayload): Promise<TComment> {
    return this.#CommentModel.query().insert(payload);
  }
}

export { Comment };

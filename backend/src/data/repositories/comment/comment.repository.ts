import { CommentModel as CommentM } from '~/data/models/models';
import {
  Comment as TComment,
  CommentCreatePayload,
} from '~/common/types/types';

type Constructor = {
  CommentModel: typeof CommentM;
};

class Comment {
  #CommentModel: typeof CommentM;

  constructor({ CommentModel }: Constructor) {
    this.#CommentModel = CommentModel;
  }

  public getAll(): Promise<TComment[]> {
    return this.#CommentModel.query().withGraphFetched('user');
  }

  public create(payload: CommentCreatePayload): Promise<TComment> {
    return this.#CommentModel.query().insert(payload).withGraphFetched('user');
  }

  public getAllByEpisodeId(id: number): Promise<TComment[]> {
    return this.#CommentModel
      .query()
      .where('episode_id', id)
      .withGraphFetched('user.image');
  }

  public getById(id: string): Promise<TComment> {
    return this.#CommentModel.query().findById(id).withGraphFetched('user');
  }

  public deleteAllByEpisodeId(id: number): Promise<TComment[]> {
    return this.#CommentModel
      .query()
      .delete()
      .where('episode_id', id)
      .returning('*');
  }

  public delete(id: number): Promise<TComment> {
    return this.#CommentModel
      .query()
      .deleteById(id)
      .returning('*')
      .first();
  }
}

export { Comment };

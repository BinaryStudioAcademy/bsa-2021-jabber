import { CommentModel as CommentM } from '~/data/models/models';
import {
  Comment as TComment,
  CommentCreateDTOPayload,
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
    return this.#CommentModel.query()
      .withGraphFetched('user')
      .omit(['password']);
  }

  public create(payload: CommentCreateDTOPayload): Promise<TComment> {
    return this.#CommentModel
      .query()
      .insert(payload)
      .withGraphFetched('user.image')
      .omit(['password']);
  }

  public getAllByEpisodeId(id: number): Promise<TComment[]> {
    return this.#CommentModel
      .query()
      .where('episode_id', id)
      .withGraphFetched('[user.image, commentReactions]')
      .omit(['password']);
  }

  public getById(id: number): Promise<TComment> {
    return this.#CommentModel
      .query()
      .findById(id)
      .withGraphFetched('[user.image, commentReactions]')
      .omit(['password']);
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

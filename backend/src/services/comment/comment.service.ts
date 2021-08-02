import { Comment as TComment, CommentCreatePayload } from '~/common/types/types';
import { comment as commentRep } from '~/data/repositories/repositories';

type Constructor = {
  commentRepository: typeof commentRep;
};

class Comment {
  #commentRepository: typeof commentRep;

  constructor({ commentRepository }: Constructor) {
    this.#commentRepository = commentRepository;
  }

  public getAll(): Promise<TComment[]> {
    return this.#commentRepository.getAll();
  }

  public create(payload: CommentCreatePayload): Promise<TComment> {
    return this.#commentRepository.create(payload);
  }
}

export { Comment };

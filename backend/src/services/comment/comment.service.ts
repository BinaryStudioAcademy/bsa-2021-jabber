import { ErrorMessage, HttpCode } from '~/common/enums/enums';
import {
  Comment as TComment,
  CommentCreatePayload,
} from '~/common/types/types';
import { comment as commentRep } from '~/data/repositories/repositories';
import { HttpError } from '~/exceptions/exceptions';

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

  public async getById(id: number): Promise<TComment> {
    const comment = await this.#commentRepository.getById(String(id));
    if (!comment) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.COMMENT_NOT_FOUND,
      });
    }
    return comment;
  }

  public create(payload: CommentCreatePayload): Promise<TComment> {
    return this.#commentRepository.create(payload);
  }

  public delete(id: number): Promise<TComment>{
    return this.#commentRepository.delete(id);
  }

  public getAllByEpisodeId(id: number): Promise<TComment[]> {
    return this.#commentRepository.getAllByEpisodeId(id);
  }

  public deleteAllByEpisodeId(id: number): Promise<TComment[]> {
    return this.#commentRepository.deleteAllByEpisodeId(id);
  }
}

export { Comment };

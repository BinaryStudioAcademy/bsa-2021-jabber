import { ErrorMessage, HttpCode } from '~/common/enums/enums';
import {
  Comment as TComment,
  CommentReaction as TCommentReaction,
  CommentCreatePayload,
} from '~/common/types/types';
import { comment as commentRep } from '~/data/repositories/repositories';
import { commentReaction as commentReactionRep } from '~/data/repositories/repositories';
import { HttpError } from '~/exceptions/exceptions';

type Constructor = {
  commentRepository: typeof commentRep;
  commentReactionRepository: typeof commentReactionRep;
};

class Comment {
  #commentRepository: typeof commentRep;
  #commentReactionRepository: typeof commentReactionRep;

  constructor({ commentRepository, commentReactionRepository }: Constructor) {
    this.#commentRepository = commentRepository;
    this.#commentReactionRepository = commentReactionRepository;
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

  public async createCommentReaction(userId: number, commentId: number): Promise<TCommentReaction> {
    const commentReaction = await this.#commentReactionRepository.getByUserIdCommentId({ userId, commentId });

    if (commentReaction) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: ErrorMessage.ALREADY_LIKED,
      });
    }
    return this.#commentReactionRepository.create({ userId, commentId });
  }

  public async delete(id: number): Promise<TComment> {
    await this.#commentReactionRepository.deleteAllByCommentId(id);
    return this.#commentRepository.delete(id);
  }

  public getAllByEpisodeId(id: number): Promise<TComment[]> {
    return this.#commentRepository.getAllByEpisodeId(id);
  }

  public deleteAllByEpisodeId(id: number): Promise<TComment[]> {
    return this.#commentRepository.deleteAllByEpisodeId(id);
  }

  public deleteCommentReaction(userId: number, commentId: number): Promise<TCommentReaction> {
    return this.#commentReactionRepository.deleteByUserIdCommentId({ userId, commentId })
  }
}

export { Comment };

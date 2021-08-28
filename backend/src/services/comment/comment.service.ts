import { ErrorMessage, HttpCode } from '~/common/enums/enums';
import {
  Comment as TComment,
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
    const comment = await this.#commentRepository.getById(id);
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

  public async createCommentReaction(userId: number, commentId: number): Promise<TComment> {
    const commentReaction = await this.#commentReactionRepository.create({ userId, commentId });
    return this.#commentRepository.getById(commentReaction.commentId);
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

  public async deleteCommentReaction(userId: number, commentId: number): Promise<TComment> {
    const deletedCommentReaction = await this.#commentReactionRepository.deleteByUserIdCommentId({ userId, commentId });
    return this.#commentRepository.getById(deletedCommentReaction.commentId);
  }
}

export { Comment };

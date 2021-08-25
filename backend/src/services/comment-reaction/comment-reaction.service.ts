import { ErrorMessage, HttpCode } from '~/common/enums/enums';
import {
  CommentReaction as TCommentReaction,
} from '~/common/types/types';
import { commentReaction as commentReactionRep } from '~/data/repositories/repositories';
import { HttpError } from '~/exceptions/exceptions';

type Constructor = {
  commentReactionRepository: typeof commentReactionRep;
};

class CommentReaction {
  #commentReactionRepository: typeof commentReactionRep;

  constructor({ commentReactionRepository }: Constructor) {
    this.#commentReactionRepository = commentReactionRepository;
  }

  public getCountByCommentId(commentId: number): Promise<number>{
    return this.#commentReactionRepository.getCountByCommentId(commentId);
  }

  public async create(userId: number, commentId: number): Promise<TCommentReaction> {
    const commentReaction = await this.#commentReactionRepository.getByUserIdCommentId({userId, commentId});

    if(commentReaction){
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: ErrorMessage.BAD_REQUEST,
      });
    }
    return this.#commentReactionRepository.create({ userId, commentId });
  }
}

export { CommentReaction };

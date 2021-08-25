import {
  CommentReactionModel as CommentReactionM,
} from '~/data/models/models';
import {
  CommentReaction as TCommentReaction,
  CommentReactionCreatePayload,
} from '~/common/types/types';

type Constructor = {
  CommentReactionModel: typeof CommentReactionM;
};

class CommentReaction {
  #CommentReactionModel: typeof CommentReactionM;

  constructor({ CommentReactionModel }: Constructor) {
    this.#CommentReactionModel = CommentReactionModel;
  }

  public getByUserIdCommentId(payload: CommentReactionCreatePayload): Promise<TCommentReaction> {
    return this.#CommentReactionModel.query()
      .findOne({
        'user_id': payload.userId,
        'comment_id': payload.commentId,
      });
  }

  public getCountByCommentId(commentId: number): Promise<number> {
    return this.#CommentReactionModel.query()
      .where('comment_id', commentId)
      .resultSize();
  }

  public create(payload: CommentReactionCreatePayload): Promise<TCommentReaction> {
    return this.#CommentReactionModel
      .query()
      .insert(payload);
  }
}

export { CommentReaction };

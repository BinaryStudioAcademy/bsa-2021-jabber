import { Comment } from 'common/types/types';

const checkIsLiked = (comment: Comment, userId: number | undefined): boolean => {
  if (!userId) {
    return false;
  }
  return comment.commentReactions?.some((reaction) => reaction.userId === userId);
};

export { checkIsLiked };

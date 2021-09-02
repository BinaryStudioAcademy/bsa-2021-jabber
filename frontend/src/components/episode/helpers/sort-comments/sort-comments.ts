import { Comment } from 'common/types/types';
import { getSortedItems } from 'helpers/helpers';

const getSortedComments = ( comments: Comment[]): Comment[] => {
  return getSortedItems(comments, (commentA: Comment, commentB: Comment) => new Date(commentB.createdAt).getTime() - new Date(commentA.createdAt).getTime());
};

export { getSortedComments };

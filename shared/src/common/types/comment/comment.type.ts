import { User, CommentReaction } from '~/common/types/types';

type Comment = {
  id: number;
  text: string;
  userId: number;
  episodeId: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  timestamp: number;
  commentReactions: CommentReaction[];
};

export type { Comment };

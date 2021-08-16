import { User } from '../user/user.type';

type Comment = {
  id: number;
  text: string;
  userId: number;
  episodeId: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  timestamp: number;
};

export type { Comment };

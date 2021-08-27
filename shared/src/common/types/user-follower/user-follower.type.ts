import { User } from '../user/user.type';

type UserFollower = {
  id: number;
  userId: number;
  followerId: number;
  createdAt: string;
  updatedAt: string;
  follower: User;
};

export type { UserFollower };

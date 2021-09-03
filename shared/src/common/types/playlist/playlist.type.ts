import { User } from '../user/user.type';

type Playlist = {
  id: number;
  userId: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  user: User;
};

export type { Playlist };

import { User } from '../user/user.type';
import { Image } from '~/common/types/image/image.type';
import { PlaylistStatus } from '~/common/enums/enums';

type Playlist = {
  id: number;
  userId: number;
  name: string;
  coverId: number | null;
  cover: Image | null;
  description: string;
  status: PlaylistStatus;
  createdAt: string;
  updatedAt: string;
  user: User;
};

export type { Playlist };

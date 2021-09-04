import { Image } from '~/common/types/image/image.type';
import { PlaylistStatus } from '~/common/enums/enums';
import { EpisodeWithPodcast } from '~/common/types/types';

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
  episodes: EpisodeWithPodcast[];
};

export type { Playlist };

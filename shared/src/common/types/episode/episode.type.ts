import { EpisodeType, EpisodeStatus } from '~/common/enums/enums';
import { Image } from '~/common/types/image/image.type';

type Episode = {
  id: number;
  name: string;
  userId: number;
  imageId: number | null;
  image: Image | null;
  status: EpisodeStatus;
  podcastId: number;
  createdAt: string;
  updatedAt: string;
  type: EpisodeType;
  description: string;
};

export type { Episode };

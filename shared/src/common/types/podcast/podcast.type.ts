import { Image } from '~/common/types/image/image.type';
import { PodcastType } from '~/common/enums/enums';

type Podcast = {
  id: number;
  name: string;
  userId: number;
  imageId: number | null;
  image: Image | null;
  createdAt: string;
  updatedAt: string;
  description: string;
  type: PodcastType;
  genreId: number;
};

export type { Podcast };

import { Image } from '~/common/types/image/image.type';

type Podcast = {
  id: number;
  name: string;
  userId: number;
  imageId: number | null;
  image: Image | null;
  createdAt: string;
  updatedAt: string;
  description: string;
};

export type { Podcast };

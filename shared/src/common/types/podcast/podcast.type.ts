import { Image } from '~/common/types/image/image.type';
import { PodcastType, PodcastPeriodicity } from '~/common/enums/enums';
import { User } from '../user/user.type';
import { Genre } from '../genre/genre.type';

type Podcast = {
  id: number;
  name: string;
  userId: number;
  imageId: number | null;
  image: Image | null;
  coverId: number | null;
  cover: Image | null;
  createdAt: string;
  updatedAt: string;
  description: string;
  type: PodcastType;
  genreId: number | null;
  user: User;
  genre: Genre | null;
  periodicity: PodcastPeriodicity;
  invitationCode?: string;
};

export type { Podcast };

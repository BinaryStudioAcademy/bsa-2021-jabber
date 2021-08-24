import { PodcastType, PodcastPeriodicity } from '~/common/enums/enums';

type PodcastEditDTOPayload = {
  name: string;
  imageId: number | null;
  coverId: number | null;
  description: string;
  type: PodcastType;
  genreId: number;
  periodicity: PodcastPeriodicity;
};

export type { PodcastEditDTOPayload };

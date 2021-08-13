import { PodcastType } from '~/common/enums/enums';

type PodcastEditDTOPayload = {
  name: string;
  imageId: number | null;
  description: string;
  type: PodcastType;
  genreId: number;
};

export type { PodcastEditDTOPayload };

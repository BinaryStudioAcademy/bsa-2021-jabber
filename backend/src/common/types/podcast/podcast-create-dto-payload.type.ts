import { PodcastType } from '~/common/enums/enums';

type PodcastCreateDTOPayload = {
  name: string;
  userId: number;
  imageId: number | null;
  description: string;
  type: PodcastType;
};

export type { PodcastCreateDTOPayload };

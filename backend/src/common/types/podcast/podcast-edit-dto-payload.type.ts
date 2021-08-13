import { PodcastType } from '~/common/enums/enums';

type PodcastEditDTOPayload = {
  name: string;
  imageId: number | null;
  coverId: number | null;
  description: string;
  type: PodcastType;
};

export type { PodcastEditDTOPayload };

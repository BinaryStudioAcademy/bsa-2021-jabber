import { EpisodeType } from '~/common/enums/enums';

type EpisodeCreateDTOPayload = {
  name: string;
  userId: number;
  imageId: number | null;
  podcastId: number;
  description: string;
  type: EpisodeType;
};

export type { EpisodeCreateDTOPayload };

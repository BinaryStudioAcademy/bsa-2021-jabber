import { EpisodeType } from '~/common/enums/enums';

type EpisodeCreateDTOPayload = {
  name: string;
  userId: number;
  podcastId: number;
  description: string;
  type: EpisodeType;
};

export type { EpisodeCreateDTOPayload };

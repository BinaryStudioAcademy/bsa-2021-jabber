import { EpisodeStatus, EpisodeType } from '~/common/enums/enums';

type EpisodeCreateDTOPayload = {
  name: string;
  userId: number;
  imageId: number | null;
  podcastId: number;
  description: string;
  type: EpisodeType;
  status: EpisodeStatus;
};

export type { EpisodeCreateDTOPayload };

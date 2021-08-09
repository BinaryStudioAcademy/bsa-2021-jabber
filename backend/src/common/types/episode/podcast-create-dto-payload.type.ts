import {EpisodeStatus, EpisodeType} from '~/common/enums/enums';

type EpisodeCreateDTOPayload = {
  name: string;
  userId: number;
  podcastId: number;
  description: string;
  type: EpisodeType;
  status: EpisodeStatus;
};

export type { EpisodeCreateDTOPayload };

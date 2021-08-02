import { EpisodeType } from '~/common/enums/enums';

type Episode = {
  id: number;
  name: string;
  userId: number;
  podcastId: number;
  createdAt: string;
  updatedAt: string;
  type: EpisodeType;
  description: string;
};

export type { Episode };

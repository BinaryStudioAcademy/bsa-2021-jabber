import { Episode } from './episode';

type EpisodeQueryPayload = {
  results: Episode[];
  totalCount: number;
};

export type { EpisodeQueryPayload };

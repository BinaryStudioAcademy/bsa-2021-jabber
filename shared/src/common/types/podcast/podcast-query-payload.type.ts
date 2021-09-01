import { Podcast } from './podcast';

type PodcastQueryPayload = {
  results: Podcast[];
  totalPagesCount: number;
};

export type { PodcastQueryPayload };

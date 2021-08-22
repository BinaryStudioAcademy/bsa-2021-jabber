import { Podcast } from './podcast';

type PodcastQueryPayload = {
  results: Podcast[];
  totalCount: number;
};

export type { PodcastQueryPayload };

import { Podcast as TPodcast } from '~/common/types/types';

type PodcastQueryResult = {
  results: TPodcast[];
  totalCount: number;
};

export type { PodcastQueryResult };

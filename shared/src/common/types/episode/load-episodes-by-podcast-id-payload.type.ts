import { EpisodeLoadFilter } from './episode-load-filter.type';

type LoadEpisodesByPodcastIdPayload = {
  podcastId: number;
  filter: EpisodeLoadFilter;
};

export type { LoadEpisodesByPodcastIdPayload };

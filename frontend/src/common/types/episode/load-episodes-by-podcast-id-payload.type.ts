import { EpisodeLoadFilter } from 'jabber-shared/common/types/types';

type LoadEpisodesByPodcastIdPayload = {
  podcastId: number;
  filter: EpisodeLoadFilter;
};

export type { LoadEpisodesByPodcastIdPayload };

import { Episode, Podcast } from '~/common/types/types';

type EpisodeWithPodcast = Episode & {
  podcast: Podcast;
};

export type { EpisodeWithPodcast };

import { EpisodeWithPodcast } from './episode-with-podcast.type';

type PlaylistEpisodeQueryPayload = {
  results: EpisodeWithPodcast[];
  totalCount: number;
};

export type { PlaylistEpisodeQueryPayload };

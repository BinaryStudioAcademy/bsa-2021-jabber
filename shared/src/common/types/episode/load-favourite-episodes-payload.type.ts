import { EpisodeLoadFilter } from './episode-load-filter.type';

type LoadFavouriteEpisodesPayload = {
  userId: number;
  filter: EpisodeLoadFilter;
};

export type { LoadFavouriteEpisodesPayload };

import { EpisodeLoadFilter } from './episode-load-filter.type';

type LoadPlaylistEpisodesPayload = {
  playlistId: number;
  filter: EpisodeLoadFilter;
};

export type { LoadPlaylistEpisodesPayload };

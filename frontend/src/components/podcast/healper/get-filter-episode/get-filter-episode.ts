import { EpisodeLoadFilter } from 'common/types/types';

export const getFilterEpisode = (page: number, row: number): EpisodeLoadFilter => {
  return {
    offset: (page - 1) * row,
    limit: row,
  };
};

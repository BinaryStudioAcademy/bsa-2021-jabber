import { EpisodeLoadFilter } from 'common/types/types';

const getFilterEpisode = (page: number, row: number): EpisodeLoadFilter => {
  return {
    offset: page * row,
    limit: row,
  };
};

export { getFilterEpisode };

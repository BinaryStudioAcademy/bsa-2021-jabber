import { EpisodeLoadFilter } from 'common/types/types';
import { PAGE_DIFFERENCE_OFFSET } from './common/constants';

const getFilterEpisode = (page: number, row: number): EpisodeLoadFilter => {
  return {
    offset: (page - PAGE_DIFFERENCE_OFFSET) * row,
    limit: row,
  };
};

export { getFilterEpisode };

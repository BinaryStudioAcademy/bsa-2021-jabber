import { PodcastLoadFilter } from 'common/types/types';

const SEARCH_TIMEOUT = 1000;
const INITIAL_PAGE_OFFSET = 0;

const DEFAULT_PODCASTS_FILTER_VALUE: PodcastLoadFilter = {
  search: '',
  offset: 0,
  genres: [],
};

export { SEARCH_TIMEOUT, INITIAL_PAGE_OFFSET, DEFAULT_PODCASTS_FILTER_VALUE };

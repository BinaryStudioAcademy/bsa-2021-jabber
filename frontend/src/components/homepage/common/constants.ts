import { PODCAST_LOAD_LIMIT } from 'common/constants/constants';

const SEARCH_TIMEOUT = 1000;
const FIRST_PAGE_OFFSET = 0;

const DEFAULT_PODCASTS_FILTER_VALUE = {
  search: '',
  offset: 0,
  limit: PODCAST_LOAD_LIMIT,
};

export { SEARCH_TIMEOUT, FIRST_PAGE_OFFSET, DEFAULT_PODCASTS_FILTER_VALUE };

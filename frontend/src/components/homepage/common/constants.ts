import { PODCAST_LOAD_LIMIT, POPULAR_USERS_LOAD_LIMIT } from 'common/constants/constants';
import { PodcastLoadFilter, UserPopularLoadFilter } from 'common/types/types';

const SEARCH_TIMEOUT = 1000;
const INITIAL_PAGE_OFFSET = 0;

const DEFAULT_PODCASTS_FILTER_VALUE: PodcastLoadFilter = {
  search: '',
  offset: 0,
  limit: PODCAST_LOAD_LIMIT,
  genres: [],
};

const DEFAULT_USER_POPULAR_FILTER_VALUE: UserPopularLoadFilter = {
  limit: POPULAR_USERS_LOAD_LIMIT,
};

export {
  SEARCH_TIMEOUT,
  INITIAL_PAGE_OFFSET,
  DEFAULT_PODCASTS_FILTER_VALUE,
  DEFAULT_USER_POPULAR_FILTER_VALUE,
};

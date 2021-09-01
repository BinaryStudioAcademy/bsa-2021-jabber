import { PodcastLoadFilter, UserPopularLoadFilter } from 'common/types/types';

const SEARCH_TIMEOUT = 1000;
const INITIAL_PAGE = 0;
const POPULAR_USERS_LOAD_LIMIT = 6;

const DEFAULT_PODCASTS_FILTER_VALUE: PodcastLoadFilter = {
  search: '',
  page: 0,
  genres: [],
};

const DEFAULT_USER_POPULAR_FILTER_VALUE: UserPopularLoadFilter = {
  limit: POPULAR_USERS_LOAD_LIMIT,
};

export {
  SEARCH_TIMEOUT,
  INITIAL_PAGE,
  DEFAULT_PODCASTS_FILTER_VALUE,
  DEFAULT_USER_POPULAR_FILTER_VALUE,
};

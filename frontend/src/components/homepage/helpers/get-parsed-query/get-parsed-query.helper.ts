import { AppRoute } from 'common/enums/enums';
import { PodcastLoadFilter } from 'common/types/types';
import { parseQueryString } from 'helpers/helpers';
import { navigation as navigationService } from 'services/services';
import { parseQuery as parseQueryValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_PODCASTS_FILTER_VALUE } from '../../common/constants';

const getParsedQuery = (params: string): PodcastLoadFilter => {
  const parsedValues = parseQueryString(params) as PodcastLoadFilter;
  const { error } = parseQueryValidationSchema.validate(parsedValues);

  if (error) {
    navigationService.push(AppRoute.ROOT);
  }

  return {
    offset: parsedValues.offset ? Number(parsedValues.offset) : DEFAULT_PODCASTS_FILTER_VALUE.offset,
    limit: parsedValues.limit ? Number(parsedValues.limit) : DEFAULT_PODCASTS_FILTER_VALUE.limit,
    search: parsedValues.search || DEFAULT_PODCASTS_FILTER_VALUE.search,
    genres: parsedValues.genres ? parsedValues.genres.map((genreId) => Number(genreId)) : DEFAULT_PODCASTS_FILTER_VALUE.genres,
  };
};

export { getParsedQuery };

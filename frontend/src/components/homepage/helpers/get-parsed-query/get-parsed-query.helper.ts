import { PodcastLoadFilter } from 'common/types/types';
import { parseQueryString } from 'helpers/helpers';
import { parseQuery as parseQueryValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_PODCASTS_FILTER_VALUE } from '../../common/constants';

const getParsedQuery = (params: string): (PodcastLoadFilter | null) => {

  const parsedValues = parseQueryString(params) as PodcastLoadFilter;
  const { error } = parseQueryValidationSchema.validate(parsedValues);

  if (error) {
    return null;
  }

  return {
    offset: parsedValues.offset ? Number(parsedValues.offset) : DEFAULT_PODCASTS_FILTER_VALUE.offset,
    search: parsedValues.search || DEFAULT_PODCASTS_FILTER_VALUE.search,
    genres: parsedValues.genres ? parsedValues.genres.map((genreId) => Number(genreId)) : DEFAULT_PODCASTS_FILTER_VALUE.genres,
  };
};

export { getParsedQuery };

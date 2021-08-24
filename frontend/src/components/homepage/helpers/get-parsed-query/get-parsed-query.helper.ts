import { PodcastLoadFilter } from 'common/types/types';
import { parseQueryString } from 'helpers/helpers';
import { parsedQuery as parsedQueryValidationSchema } from 'validation-schemas/validation-schemas';

const getParsedQuery = (params: string): (PodcastLoadFilter | null) => {

  const parsedValues = parseQueryString(params) as PodcastLoadFilter;
  const { error } = parsedQueryValidationSchema.validate(parsedValues);

  if (error) {
    return null;
  }

  return {
    offset: Number(parsedValues.offset),
    search: parsedValues.search,
    genres: parsedValues.genres?.map((genreId) => Number(genreId)) ?? [],
  };
};

export { getParsedQuery };

import { PodcastLoadFilter } from 'common/types/types';
import { parseQueryString } from 'helpers/helpers';
import { parseQuery as parseQueryValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_PODCASTS_FILTER_VALUE } from '../../common/constants';

const getParsedQuery = (params: string): PodcastLoadFilter => {
  const parsedValues = parseQueryString(params) as PodcastLoadFilter;
  const { error } = parseQueryValidationSchema.validate(parsedValues);

  // eslint-disable-next-line no-console
  console.log(error);

  return DEFAULT_PODCASTS_FILTER_VALUE;
};

export { getParsedQuery };

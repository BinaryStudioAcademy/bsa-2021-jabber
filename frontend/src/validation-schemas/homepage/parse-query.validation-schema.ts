import { Joi } from 'helpers/helpers';
import { PodcastLoadFilterKey } from 'common/enums/enums';

const parseQuery = Joi.object({
  [PodcastLoadFilterKey.OFFSET]: Joi.number().integer().allow(undefined),
  [PodcastLoadFilterKey.LIMIT]: Joi.number()
    .integer()
    .positive()
    .allow(0, undefined),
  [PodcastLoadFilterKey.SEARCH]: Joi.string().allow(undefined),
  [PodcastLoadFilterKey.GENRES]: Joi.array()
    .items(Joi.number())
    .allow(undefined),
});

export { parseQuery };

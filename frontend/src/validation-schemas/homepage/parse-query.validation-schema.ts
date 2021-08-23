import { Joi } from 'helpers/helpers';
import { PodcastLoadFilterKey } from 'common/enums/enums';

const parseQuery = Joi.object({
  [PodcastLoadFilterKey.OFFSET]: Joi.number()
    .optional()
    .integer()
    .allow(0)
    .positive(),
  [PodcastLoadFilterKey.SEARCH]: Joi.string().optional().allow(''),
  [PodcastLoadFilterKey.GENRES]: Joi.array().optional().items(Joi.number()),
});

export { parseQuery };

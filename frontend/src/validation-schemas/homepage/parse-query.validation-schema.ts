import { Joi } from 'helpers/helpers';
import { PodcastLoadFilterKey } from 'common/enums/enums';

const parseQuery = Joi.object({
  [PodcastLoadFilterKey.OFFSET]: Joi.number()
    .integer()
    .allow(0)
    .positive()
    .required(),
  [PodcastLoadFilterKey.SEARCH]: Joi.string().allow('').required(),
  [PodcastLoadFilterKey.GENRES]: Joi.array().optional().items(Joi.number()),
});

export { parseQuery };

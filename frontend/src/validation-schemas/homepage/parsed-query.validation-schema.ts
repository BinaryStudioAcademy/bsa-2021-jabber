import { Joi } from 'helpers/helpers';
import { PodcastSearchPayloadKey } from 'common/enums/enums';

const parsedQuery = Joi.object({
  [PodcastSearchPayloadKey.OFFSET]: Joi.number()
    .integer()
    .allow(0)
    .positive()
    .required(),
  [PodcastSearchPayloadKey.SEARCH]: Joi.string().allow('').required(),
  [PodcastSearchPayloadKey.GENRES]: Joi.array().optional().items(Joi.number()),
});

export { parsedQuery };

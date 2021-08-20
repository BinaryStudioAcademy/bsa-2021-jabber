import { Joi } from '~/helpers/helpers';
import { EpisodePayloadKey } from '~/common/enums/enums';
import { common } from '../common/common.validation-schema';

const episodeEdit = common.keys({
  [EpisodePayloadKey.IMAGE_ID]: Joi.number().integer().allow(null),
});

export { episodeEdit };

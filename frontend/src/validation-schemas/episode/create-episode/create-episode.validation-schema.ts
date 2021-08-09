import { Joi } from 'helpers/helpers';
import { EpisodePayloadKey } from 'common/enums/enums';
import { episodeCreate as episodeCreateCommon } from 'jabber-shared/validation-schemas/validation-schemas';

const episodeCreate = episodeCreateCommon.keys({
  [EpisodePayloadKey.IMAGE]: Joi.object().allow(null),
  [EpisodePayloadKey.RECORD]: Joi.object().required(),
});

export { episodeCreate };

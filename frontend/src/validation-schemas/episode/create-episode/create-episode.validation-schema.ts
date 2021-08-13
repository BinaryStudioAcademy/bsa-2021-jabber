import { Joi } from 'helpers/helpers';
import { EpisodePayloadKey } from 'common/enums/enums';
import { episode } from 'jabber-shared/validation-schemas/validation-schemas';

const episodeCreate = episode.keys({
  [EpisodePayloadKey.IMAGE]: Joi.object().allow(null),
  [EpisodePayloadKey.RECORD]: Joi.object().allow(null),
});

export { episodeCreate };

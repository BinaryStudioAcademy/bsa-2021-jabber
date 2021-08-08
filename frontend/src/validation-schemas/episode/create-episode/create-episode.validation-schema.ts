import { Joi } from 'helpers/helpers';
import { episode } from 'jabber-shared/validation-schemas/validation-schemas';
import { EpisodePayloadKey } from 'common/enums/enums';

const episodeCreate = episode.keys({
  [EpisodePayloadKey.RECORD]: Joi.object().required(),
});

export { episodeCreate };

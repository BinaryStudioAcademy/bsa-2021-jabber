import { Joi } from 'helpers/helpers';
import { podcast } from 'jabber-shared/validation-schemas/validation-schemas';
import { PodcastPayloadKey } from 'common/enums/enums';

const podcastCreate = podcast.keys({
  [PodcastPayloadKey.IMAGE]: Joi.object().allow(null),
});

export { podcastCreate };

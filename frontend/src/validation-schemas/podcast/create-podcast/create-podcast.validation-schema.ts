import { Joi } from 'helpers/helpers';
import { podcast } from 'jabber-shared/validation-schemas/validation-schemas';
import { PodcastPayloadKey, PodcastType } from 'common/enums/enums';

const podcastType = Object.values(PodcastType);

const podcastCreate = podcast.keys({
  [PodcastPayloadKey.IMAGE]: Joi.object().required(),
  [PodcastPayloadKey.TYPE]: Joi.string().valid(...podcastType),
});

export { podcastCreate };

import { Joi } from '~/helpers/helpers';
import {
  PodcastValidationRule,
  PodcastValidationMessage,
  PodcastPayloadKey,
  PodcastType,
} from '~/common/enums/enums';

const podcastType = Object.values(PodcastType);

const podcast = Joi.object({
  [PodcastPayloadKey.NAME]: Joi.string()
    .trim()
    .min(PodcastValidationRule.PODCAST_NAME_MIN_LENGTH)
    .max(PodcastValidationRule.PODCAST_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': PodcastValidationMessage.PODCAST_NAME_REQUIRE,
      'string.min': PodcastValidationMessage.PODCAST_NAME_MIN_LENGTH,
      'string.max': PodcastValidationMessage.PODCAST_NAME_MAX_LENGTH,
    }),
  [PodcastPayloadKey.DESCRIPTION]: Joi.string()
    .trim()
    .min(PodcastValidationRule.PODCAST_DESCRIPTION_MIN_LENGTH)
    .max(PodcastValidationRule.PODCAST_DESCRIPTION_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': PodcastValidationMessage.PODCAST_DESCRIPTION_REQUIRE,
      'string.min': PodcastValidationMessage.PODCAST_DESCRIPTION_MIN_LENGTH,
      'string.max': PodcastValidationMessage.PODCAST_DESCRIPTION_MAX_LENGTH,
    }),
  [PodcastPayloadKey.TYPE]: Joi.string().valid(...podcastType),
});

export { podcast };

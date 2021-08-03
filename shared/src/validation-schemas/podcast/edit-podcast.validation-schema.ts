import * as Joi from 'joi';
import {
  PodcastValidationRule,
  PodcastValidationMessage,
  PodcastEditPayloadKey,
} from '~/common/enums/enums';
import { Podcast } from '~/common/types/types';

const editPodcast = Joi.object<Podcast>({
  [PodcastEditPayloadKey.NAME]: Joi.string()
    .min(PodcastValidationRule.PODCAST_NAME_MIN_LENGTH)
    .max(PodcastValidationRule.PODCAST_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': PodcastValidationMessage.PODCAST_NAME_REQUIRE,
      'string.min': PodcastValidationMessage.PODCAST_NAME_MIN_LENGTH,
      'string.max': PodcastValidationMessage.PODCAST_NAME_MAX_LENGTH,
    }),
  [PodcastEditPayloadKey.USER_ID]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.required': PodcastValidationMessage.USER_ID_REQUIRE,
      'number.integer': PodcastValidationMessage.USER_ID_NUMBER_FORMAT,
    }),
  [PodcastEditPayloadKey.DESCRIPTION]: Joi.string()
    .min(PodcastValidationRule.PODCAST_DESCRIPTION_MIN_LENGTH)
    .max(PodcastValidationRule.PODCAST_DESCRIPTION_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': PodcastValidationMessage.PODCAST_DESCRIPTION_REQUIRE,
      'string.min': PodcastValidationMessage.PODCAST_DESCRIPTION_MIN_LENGTH,
      'string.max': PodcastValidationMessage.PODCAST_DESCRIPTION_MAX_LENGTH,
    }),
  [PodcastEditPayloadKey.UPDATE_AT]: Joi.date()
    .required(),
  [PodcastEditPayloadKey.CREATE_AT]: Joi.date()
    .required(),
  [PodcastEditPayloadKey.ID]: Joi.number()
    .required(),
  [PodcastEditPayloadKey.IMAGE_ID]: Joi.number().allow(null)
});

export { editPodcast };

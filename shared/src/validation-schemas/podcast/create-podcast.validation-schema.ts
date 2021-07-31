import * as Joi from 'joi';
import {
  PodcastValidationRule,
  PodcastValidationMessage,
  PodcastCreatePayloadKey,
} from '~/common/enums/enums';
import { PodcastCreatePayload } from '~/common/types/types';

const podcast = Joi.object<PodcastCreatePayload>({
  [PodcastCreatePayloadKey.NAME]: Joi.string()
    .min(PodcastValidationRule.PODCAST_NAME_MIN_LENGTH)
    .max(PodcastValidationRule.PODCAST_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': PodcastValidationMessage.PODCAST_NAME_REQUIRE,
      'string.min': PodcastValidationMessage.PODCAST_NAME_MIN_LENGTH,
      'string.max': PodcastValidationMessage.PODCAST_NAME_MAX_LENGTH,
    }),
  [PodcastCreatePayloadKey.USER_ID]: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({
      'number.required': PodcastValidationMessage.USER_ID_REQUIRE,
      'number.integer': PodcastValidationMessage.USER_ID_NUMBER_FORMAT,
      'number.positive': PodcastValidationMessage.USER_ID_NUMBER_FORMAT,
    }),
});

export { podcast };

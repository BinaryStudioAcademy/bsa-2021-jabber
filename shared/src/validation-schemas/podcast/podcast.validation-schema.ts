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
    .required()
    .messages({
      'number.required': PodcastValidationMessage.USER_ID_REQUIRE,
      'number.integer': PodcastValidationMessage.USER_ID_NUMBER_FORMAT,
    }),
  [PodcastCreatePayloadKey.DESCRIPTION]: Joi.string()
    .min(PodcastValidationRule.PODCAST_DESCRIPTION_MIN_LENGTH)
    .max(PodcastValidationRule.PODCAST_DESCRIPTION_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': PodcastValidationMessage.PODCAST_DESCRIPTION_REQUIRE,
      'string.min': PodcastValidationMessage.PODCAST_DESCRIPTION_MIN_LENGTH,
      'string.max': PodcastValidationMessage.PODCAST_DESCRIPTION_MAX_LENGTH,
    }),
  [PodcastCreatePayloadKey.IMG_DATA_URL]: [
    Joi.string()
      .uri()
      .pattern(/^data:image\/(jpeg|png|svg\+xml);base64,.*/)
      .messages({
        'string.uri': PodcastValidationMessage.DATA_URL_FORMAT,
        'string.pattern': PodcastValidationMessage.DATA_URL_FORMAT,
      }),
    Joi.any().equal(''),
  ],
});

export { podcast };

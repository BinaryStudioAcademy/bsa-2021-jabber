import { Joi } from '~/helpers/helpers';
import { podcast } from 'jabber-shared/validation-schemas/validation-schemas';
import {
  PodcastPayloadKey,
  PodcastValidationMessage,
} from '~/common/enums/enums';

const podcastCreate = podcast.keys({
  [PodcastPayloadKey.USER_ID]: Joi.number().integer().required().messages({
    'number.required': PodcastValidationMessage.USER_ID_REQUIRE,
    'number.integer': PodcastValidationMessage.USER_ID_NUMBER_FORMAT,
  }),
  [PodcastPayloadKey.IMAGE_DATA_URL]: [
    Joi.string().uri().messages({
      'string.uri': PodcastValidationMessage.DATA_URL_FORMAT,
    }),
    Joi.any().equal(null),
  ],
  [PodcastPayloadKey.COVER_DATA_URL]: [
    Joi.string().uri().messages({
      'string.uri': PodcastValidationMessage.DATA_URL_FORMAT,
    }),
    Joi.any().equal(null),
  ],
  [PodcastPayloadKey.GENRE_ID]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.integer': PodcastValidationMessage.GENRE_ID_NUMBER_FORMAT,
      'number.required': PodcastValidationMessage.GENRE_REQUIRE,
    }),
});

export { podcastCreate };

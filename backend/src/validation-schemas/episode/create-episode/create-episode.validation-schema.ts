import { Joi } from '~/helpers/helpers';
import { episode } from 'jabber-shared/validation-schemas/validation-schemas';
import {
  EpisodeValidationMessage,
  EpisodePayloadKey,
} from '~/common/enums/enums';

const episodeCreate = episode.keys({
  [EpisodePayloadKey.USER_ID]: Joi.number().integer().required().messages({
    'number.required': EpisodeValidationMessage.USER_ID_REQUIRE,
    'number.integer': EpisodeValidationMessage.USER_ID_NUMBER_FORMAT,
  }),
  [EpisodePayloadKey.PODCAST_ID]: Joi.number().integer().required().messages({
    'number.required': EpisodeValidationMessage.PODCAST_ID_REQUIRE,
    'number.integer': EpisodeValidationMessage.PODCAST_ID_NUMBER_FORMAT,
  }),
  [EpisodePayloadKey.RECORD_DATA_URL]: [
    Joi.string().uri().messages({
      'string.uri': EpisodeValidationMessage.DATA_URL_FORMAT,
    }),
    Joi.any().equal(null),
  ],
  [EpisodePayloadKey.IMAGE_DATA_URL]: [
    Joi.string().uri().messages({
      'string.uri': EpisodeValidationMessage.DATA_URL_FORMAT_IMG,
    }),
    Joi.any().equal(null),
  ],
});

export { episodeCreate };

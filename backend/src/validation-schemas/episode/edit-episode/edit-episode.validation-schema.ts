import { Joi } from '~/helpers/helpers';
import { episode } from 'jabber-shared/validation-schemas/validation-schemas';
import {
  EpisodeValidationMessage,
  EpisodePayloadKey,
} from '~/common/enums/enums';

const episodeEdit = episode.keys({
  [EpisodePayloadKey.USER_ID]: Joi.number().integer().required().messages({
    'number.required': EpisodeValidationMessage.USER_ID_REQUIRE,
    'number.integer': EpisodeValidationMessage.USER_ID_NUMBER_FORMAT,
  }),
  [EpisodePayloadKey.RECORD_DATA_URL]: [
    Joi.string().uri().messages({
      'string.uri': EpisodeValidationMessage.DATA_URL_FORMAT,
    }),
    Joi.any().equal(null),
  ],
});

export { episodeEdit };

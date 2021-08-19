import { Joi } from '~/helpers/helpers';
import {
  EpisodePayloadKey,
  EpisodeValidationMessage,
  ShownotePayloadKey,
} from '~/common/enums/enums';
import { shownoteCreate } from '~/validation-schemas/shownote/create-shownote/create-shownote.validation-schema';
import { episode } from 'jabber-shared/validation-schemas/validation-schemas';

const common = episode.keys({
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
  [EpisodePayloadKey.IMAGE_DATA_URL]: [
    Joi.string().uri().messages({
      'string.uri': EpisodeValidationMessage.DATA_URL_FORMAT,
    }),
    Joi.any().equal(null),
  ],
  [EpisodePayloadKey.SHOWNOTES]: Joi.array()
    .items(shownoteCreate)
    .unique(
      (a, b) =>
        a[ShownotePayloadKey.TIMESTAMP] === b[ShownotePayloadKey.TIMESTAMP],
    )
    .required()
    .messages({
      'array.required': EpisodeValidationMessage.SHOWNOTES_REQUIRE,
      'array.unique': EpisodeValidationMessage.SHOWNOTE_DUPLICATE,
    }),
});

export { common };

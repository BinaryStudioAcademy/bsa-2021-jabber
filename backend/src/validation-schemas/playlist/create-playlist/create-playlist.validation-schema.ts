import { Joi } from '~/helpers/helpers';
import { playlist } from 'jabber-shared/validation-schemas/validation-schemas';
import {
  PlaylistPayloadKey,
  PlaylistValidationMessage,
  PlaylistStatus,
} from '~/common/enums/enums';

const playlistCreate = playlist.keys({
  [PlaylistPayloadKey.USER_ID]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.required': PlaylistValidationMessage.USER_ID_REQUIRE,
      'number.integer': PlaylistValidationMessage.USER_ID_NUMBER_FORMAT,
    }),
  [PlaylistPayloadKey.COVER_DATA_URL]: [
    Joi.string().uri().messages({
      'string.uri': PlaylistValidationMessage.DATA_URL_FORMAT,
    }),
    Joi.any().equal(null),
  ],
  [PlaylistPayloadKey.STATUS]: Joi.any()
    .valid(PlaylistStatus.STAGING)
    .messages({
      'any.only': PlaylistValidationMessage.INVALID_PLAYLIST_STATUS,
    }),
});

export { playlistCreate };

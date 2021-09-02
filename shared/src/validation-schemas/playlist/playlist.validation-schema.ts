import { Joi } from '~/helpers/helpers';
import {
  PlaylistValidationMessage,
  PlaylistValidationRule,
  PlaylistPayloadKey,
  PlaylistStatus,
} from '~/common/enums/enums';

const playlistStatus = Object.values(PlaylistStatus);

const playlist = Joi.object({
  [PlaylistPayloadKey.NAME]: Joi.string()
    .trim()
    .min(PlaylistValidationRule.PLAYLIST_NAME_MIN_LENGTH)
    .max(PlaylistValidationRule.PLAYLIST_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': PlaylistValidationMessage.PLAYLIST_NAME_REQUIRE,
      'string.min': PlaylistValidationMessage.PLAYLIST_NAME_MIN_LENGTH,
      'string.max': PlaylistValidationMessage.PLAYLIST_NAME_MAX_LENGTH,
    }),
  [PlaylistPayloadKey.DESCRIPTION]: Joi.string()
    .trim()
    .min(PlaylistValidationRule.PLAYLIST_DESCRIPTION_MIN_LENGTH)
    .max(PlaylistValidationRule.PLAYLIST_DESCRIPTION_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': PlaylistValidationMessage.PLAYLIST_DESCRIPTION_REQUIRE,
      'string.min': PlaylistValidationMessage.PLAYLIST_DESCRIPTION_MIN_LENGTH,
      'string.max': PlaylistValidationMessage.PLAYLIST_DESCRIPTION_MAX_LENGTH,
    }),
  [PlaylistPayloadKey.STATUS]: Joi.string()
    .valid(...playlistStatus)
    .messages({
      'string.empty': PlaylistValidationMessage.STATUS_REQUIRE,
    }),
});

export { playlist };

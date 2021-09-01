import { Joi } from '~/helpers/helpers';
import {
  PlaylistValidationMessage,
  PlaylistValidationRule,
  PlaylistPayloadKey,
} from '~/common/enums/enums';
import { PlaylistPayload } from '~/common/types/types';

const playlist = Joi.object<PlaylistPayload>({
  [PlaylistPayloadKey.USER_ID]: Joi.number().integer().required().messages({
    'number.required': PlaylistValidationMessage.USER_ID_REQUIRE,
    'number.integer': PlaylistValidationMessage.USER_ID_NUMBER_FORMAT,
  }),
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
});

export { playlist };

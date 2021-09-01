import { Joi } from '~/helpers/helpers';
import {
  PlaylistValidationMessage,
  PlaylistValidationRule,
  PlaylistPayloadKey,
} from '~/common/enums/enums';
import { PlaylistPayload } from '~/common/types/types';

const playlist = Joi.object<PlaylistPayload>({
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

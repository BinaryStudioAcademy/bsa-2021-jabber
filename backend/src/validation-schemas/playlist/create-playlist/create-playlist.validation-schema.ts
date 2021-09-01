import { Joi } from '~/helpers/helpers';
import { playlist } from 'jabber-shared/validation-schemas/validation-schemas';
import {
  PlaylistPayloadKey,
  PlaylistValidationMessage,
} from '~/common/enums/enums';

const createPlaylist = playlist.keys({
  [PlaylistPayloadKey.USER_ID]: Joi.number().integer().required().messages({
    'number.required': PlaylistValidationMessage.USER_ID_REQUIRE,
    'number.integer': PlaylistValidationMessage.USER_ID_NUMBER_FORMAT,
  }),
});

export { createPlaylist };

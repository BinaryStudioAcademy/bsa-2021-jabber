import { Joi } from '~/helpers/helpers';
import {
  PlaylistEpisodePayloadKey,
  PlaylistEpisodeValidationMessage,
} from '~/common/enums/enums';
import { PlaylistEpisodePayload } from '~/common/types/types';

const playlistEpisode = Joi.object<PlaylistEpisodePayload>({
  [PlaylistEpisodePayloadKey.PLAYLIST_ID]: Joi.number().integer().required().messages({
    'number.required': PlaylistEpisodeValidationMessage.PLAYLIST_ID_REQUIRE,
    'number.integer': PlaylistEpisodeValidationMessage.PLAYLIST_ID_NUMBER_FORMAT,
  }),
  [PlaylistEpisodePayloadKey.EPISODE_ID]: Joi.number().integer().required().messages({
    'number.required': PlaylistEpisodeValidationMessage.EPISODE_ID_REQUIRE,
    'number.integer': PlaylistEpisodeValidationMessage.EPISODE_ID_NUMBER_FORMAT,
  }),
});

export { playlistEpisode };

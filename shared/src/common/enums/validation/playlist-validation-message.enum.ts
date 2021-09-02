import { PlaylistValidationRule } from './playlist-validation-rule.enum';

const PlaylistValidationMessage = {
  PLAYLIST_NAME_REQUIRE: 'Playlist name is required',
  PLAYLIST_NAME_MIN_LENGTH: `Playlist name must be at least ${PlaylistValidationRule.PLAYLIST_NAME_MIN_LENGTH} character long`,
  PLAYLIST_NAME_MAX_LENGTH: `Playlist name must be at most ${PlaylistValidationRule.PLAYLIST_NAME_MAX_LENGTH} characters long`,
  USER_ID_REQUIRE: 'User id required',
  USER_ID_NUMBER_FORMAT: 'User id must be an integer',
  PLAYLIST_DESCRIPTION_REQUIRE: 'Playlist description is required',
  PLAYLIST_DESCRIPTION_MIN_LENGTH: `Playlist description must be at least ${PlaylistValidationRule.PLAYLIST_DESCRIPTION_MIN_LENGTH} character long`,
  PLAYLIST_DESCRIPTION_MAX_LENGTH: `Playlist description must be at most ${PlaylistValidationRule.PLAYLIST_DESCRIPTION_MAX_LENGTH} characters long`,
  FILE_EXTENSION_FORMAT: 'Cover image file must have valid type',
} as const;

export { PlaylistValidationMessage };

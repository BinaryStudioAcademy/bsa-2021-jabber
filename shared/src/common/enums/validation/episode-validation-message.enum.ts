import { EpisodeValidationRule } from './episode-validation-rule.enum';

const EpisodeValidationMessage = {
  EPISODE_NAME_REQUIRE: 'Episode name is required',
  EPISODE_NAME_MIN_LENGTH: `Episode name must be at least ${EpisodeValidationRule.EPISODE_NAME_MIN_LENGTH} character long`,
  EPISODE_NAME_MAX_LENGTH: `Episode name must be at most ${EpisodeValidationRule.EPISODE_NAME_MAX_LENGTH} characters long`,
  USER_ID_REQUIRE: 'User id is required',
  USER_ID_NUMBER_FORMAT: 'User id must be an integer',
  PODCAST_ID_REQUIRE: 'Podcast id is required',
  PODCAST_ID_NUMBER_FORMAT: 'Podcast id must be an integer',
  TYPE_REQUIRE: 'Episode type is required',
  SHOWNOTES_REQUIRE: 'Shownotes field is required',
  SHOWNOTE_DUPLICATE: 'Shownote contains a duplicate value',
  EPISODE_DESCRIPTION_REQUIRE: 'Episode description is required',
  EPISODE_DESCRIPTION_MIN_LENGTH: `Episode DESCRIPTION must be at least ${EpisodeValidationRule.EPISODE_DESCRIPTION_MIN_LENGTH} character long`,
  EPISODE_DESCRIPTION_MAX_LENGTH: `Episode DESCRIPTION must be at most ${EpisodeValidationRule.EPISODE_DESCRIPTION_MAX_LENGTH} characters long`,
  STATUS_REQUIRE: 'Episode status is required',
  DATA_URL_FORMAT_IMG: 'Cover image must be valid jpeg, png or svg file',
  DATA_URL_FORMAT: 'Cover record must be valid mp3 or wav file',
} as const;

export { EpisodeValidationMessage };

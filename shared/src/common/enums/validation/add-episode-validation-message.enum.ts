import { AddEpisodeValidationRule } from './add-episode-validation-rule.enum';

const AddEpisodeValidationMessage = {
  NAME_REQUIRE: 'Name is required',
  NAME_MIN_LENGTH: `Name must be at least ${AddEpisodeValidationRule.NAME_MIN_LENGTH} character long`,
  NAME_MAX_LENGTH: `Name must be at most ${AddEpisodeValidationRule.NAME_MAX_LENGTH} characters long`,
} as const;

export { AddEpisodeValidationMessage };

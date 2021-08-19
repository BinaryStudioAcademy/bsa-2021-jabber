import { ShownoteValidationRule } from './shownote-validation-rule.enum';

const ShownoteValidationMessage = {
  SHOWNOTE_NAME_REQUIRE: 'Shownote name is required',
  SHOWNOTE_NAME_MIN_LENGTH: `Shownote name must be at least ${ShownoteValidationRule.SHOWNOTE_NAME_MIN_LENGTH} character long`,
  SHOWNOTE_NAME_MAX_LENGTH: `Shownote name must be at most ${ShownoteValidationRule.SHOWNOTE_NAME_MAX_LENGTH} characters long`,
  EPISODE_ID_REQUIRE: 'Episode id is required',
  EPISODE_ID_NUMBER_FORMAT: 'Episode id must be an integer',
  TIMESTAMP_REQUIRE: 'Timestamp is required',
  TIMESTAMP_BASE: 'Timestamp must be a number',
  TIMESTAMP_NUMBER_FORMAT: 'Timestamp must be an integer',
  TIMESTAMP_MIN_VALUE: `Timestamp must be greater than or equal to ${ShownoteValidationRule.TIMESTAMP_MIN_VALUE}`,
  MINUTES_REQUIRE: 'Minutes is require',
  MINUTES_BASE: 'Minutes must be a number',
  MINUTES_NUMBER_FORMAT: 'Minutes must be an integer',
  MINUTES_MIN_VALUE: `Minutes must be greater than or equal to ${ShownoteValidationRule.MINUTES_MIN_VALUE}`,
  SECONDS_REQUIRE: 'Seconds is required',
  SECONDS_BASE: 'Seconds must be a number',
  SECONDS_NUMBER_FORMAT: 'Seconds must be an integer',
  SECONDS_MIN_VALUE: `Seconds must be greater than or equal to ${ShownoteValidationRule.SECONDS_MIN_VALUE}`,
  SECONDS_MAX_VALUE: `Seconds must be less or equal to ${ShownoteValidationRule.SECONDS_MAX_VALUE}`,
} as const;

export { ShownoteValidationMessage };

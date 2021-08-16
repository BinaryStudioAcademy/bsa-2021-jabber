import { UserValidationRule } from './user-validation-rule.enum';

const UserValidationMessage = {
  FIRST_NAME_REQUIRE: 'First name is required',
  FIRST_NAME_MIN_LENGTH: `First name must be at least ${UserValidationRule.FIRST_NAME_MIN_LENGTH} character long`,
  FIRST_NAME_MAX_LENGTH: `First name must be at most ${UserValidationRule.FIRST_NAME_MAX_LENGTH} characters long`,
  LAST_NAME_REQUIRE: 'Last name is required',
  LAST_NAME_MIN_LENGTH: `Last name must be at least ${UserValidationRule.LAST_NAME_MIN_LENGTH} character long`,
  LAST_NAME_MAX_LENGTH: `Last name must be at most ${UserValidationRule.LAST_NAME_MAX_LENGTH} characters long`,
  NICKNAME_REQUIRE: 'Nickname is required',
  NICKNAME_MIN_LENGTH: `Nickname must be at least ${UserValidationRule.NICKNAME_MIN_LENGTH} characters long`,
  NICKNAME_MAX_LENGTH: `Nickname must be at most ${UserValidationRule.NICKNAME_MAX_LENGTH} characters long`,
  EMAIL_REQUIRE: 'Email is required',
  EMAIL_WRONG: 'Email is wrong',
  PASSWORD_WRONG: 'Password is wrong',
  PASSWORD_REQUIRE: 'Password is required',
  PASSWORD_MIN_LENGTH: `Password must be at least ${UserValidationRule.PASSWORD_MIN_LENGTH} characters long`,
  PASSWORD_MAX_LENGTH: `Password must be at most ${UserValidationRule.PASSWORD_MAX_LENGTH} characters long`,
  BIRTHDATE_REQUIRE: 'Birthdate is required',
  BIRTHDATE_LESS_THEN: 'Birthdate can not be future date',
  BIO_MAX_LENGTH: `Bio must be at most ${UserValidationRule.BIO_MAX_LENGTH} characters long`,
} as const;

export { UserValidationMessage };

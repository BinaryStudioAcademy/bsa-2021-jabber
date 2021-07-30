enum SignUpValidationMessage {
  FIRST_NAME_REQUIRE = 'First name is required',
  FIRST_NAME_MIN_LENGTH = 'First name must be at least 1 character long',
  FIRST_NAME_MAX_LENGTH = 'First name must be at most 20 characters long',
  LAST_NAME_REQUIRE = 'Last name is required',
  LAST_NAME_MIN_LENGTH = 'Last name must be at least 1 character long',
  LAST_NAME_MAX_LENGTH = 'Last name must be at most 20 characters long',
  NICKNAME_REQUIRE = 'Nickname is required',
  NICKNAME_MIN_LENGTH = 'Nickname must be at least 3 characters long',
  NICKNAME_MAX_LENGTH = 'Nickname must be at most 15 characters long',
  EMAIL_REQUIRE = 'Email is required',
  EMAIL_WRONG = 'Email is wrong',
  PASSWORD_REQUIRE = 'Password is required',
  PASSWORD_MIN_LENGTH = 'Password must be at least 6 characters long',
  PASSWORD_MAX_LENGTH = 'Password must be at most 15 characters long',
  BIRTHDATE_REQUIRE = 'Birthdate is required',
  BIRTHDATE_WRONG = 'Birthdate is wrong',
}

export { SignUpValidationMessage };

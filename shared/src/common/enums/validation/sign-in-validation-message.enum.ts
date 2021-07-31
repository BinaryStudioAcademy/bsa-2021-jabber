import { SignInValidationRule } from './sign-in-validation-rule.enum';

const SignInValidationMessage = {
  EMAIL_WRONG: 'Email is wrong',
  EMAIL_REQUIRED: 'Email is required',
  PASSWORD_WRONG: 'Password is wrong',
  PASSWORD_MIN_LENGTH: `Password must be at least ${ SignInValidationRule.PASSWORD_MIN_LENGTH } characters long`,
  PASSWORD_MAX_LENGTH: `Password must be at most ${ SignInValidationRule.PASSWORD_MAX_LENGTH } characters long`,
  PASSWORD_REQUIRED: 'Password is required',
} as const;

export { SignInValidationMessage };

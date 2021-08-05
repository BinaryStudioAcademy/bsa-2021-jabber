import { Joi } from '~/helpers/helpers';
import { UserSignInPayload } from '~/common/types/types';
import {
  SignInValidationMessage,
  SignInValidationRule,
  UserSignInPayloadKey,
} from '~/common/enums/enums';

const signIn = Joi.object<UserSignInPayload>({
  [UserSignInPayloadKey.EMAIL]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': SignInValidationMessage.EMAIL_WRONG,
      'any.required': SignInValidationMessage.EMAIL_REQUIRED,
    }),
  [UserSignInPayloadKey.PASSWORD]: Joi.string()
    .trim()
    .min(SignInValidationRule.PASSWORD_MIN_LENGTH)
    .max(SignInValidationRule.PASSWORD_MAX_LENGTH)
    .required()
    .messages({
      'string.base': SignInValidationMessage.EMAIL_WRONG,
      'string.min': SignInValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': SignInValidationMessage.PASSWORD_MAX_LENGTH,
      'any.required': SignInValidationMessage.PASSWORD_REQUIRED,
    }),
});

export { signIn };

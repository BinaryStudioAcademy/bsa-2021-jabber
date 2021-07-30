import * as Joi from 'joi';
import { UserSignInPayload } from '../../common/types/types';
import {SignInValidationMessage, UserSignInPayloadKey} from "~/common/enums/enums";

const SigninSchema = Joi.object<UserSignInPayload>({
  [UserSignInPayloadKey.EMAIL]: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': SignInValidationMessage.EMAIL_NOT_VALID,
      'any.required': SignInValidationMessage.EMAIL_REQUIRED,
    }),
  [UserSignInPayloadKey.PASSWORD]: Joi.string()
    .min(3)
    .required()
    .messages({
      'string.base': SignInValidationMessage.PASSWORD_NOT_VALID,
      'string.min': SignInValidationMessage.PASSWORD_MIN,
      'any.required': SignInValidationMessage.PASSWORD_REQUIRED,
    })
});

export { SigninSchema };

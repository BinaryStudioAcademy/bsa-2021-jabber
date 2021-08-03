import { Joi } from '~/helpers/helpers';
import {
  SignUpValidationRule,
  SignUpValidationMessage,
  UserCreatePayloadKey,
} from '~/common/enums/enums';
import { UserCreatePayload } from '~/common/types/types';

const signUp = Joi.object<UserCreatePayload>({
  [UserCreatePayloadKey.FIRST_NAME]: Joi.string()
    .trim()
    .min(SignUpValidationRule.FIRST_NAME_MIN_LENGTH)
    .max(SignUpValidationRule.FIRST_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': SignUpValidationMessage.FIRST_NAME_REQUIRE,
      'string.min': SignUpValidationMessage.FIRST_NAME_MIN_LENGTH,
      'string.max': SignUpValidationMessage.FIRST_NAME_MAX_LENGTH,
    }),
  [UserCreatePayloadKey.LAST_NAME]: Joi.string()
    .trim()
    .min(SignUpValidationRule.LAST_NAME_MIN_LENGTH)
    .max(SignUpValidationRule.LAST_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': SignUpValidationMessage.LAST_NAME_REQUIRE,
      'string.min': SignUpValidationMessage.LAST_NAME_MIN_LENGTH,
      'string.max': SignUpValidationMessage.LAST_NAME_MAX_LENGTH,
    }),
  [UserCreatePayloadKey.NICKNAME]: Joi.string()
    .trim()
    .min(SignUpValidationRule.NICKNAME_MIN_LENGTH)
    .max(SignUpValidationRule.NICKNAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': SignUpValidationMessage.NICKNAME_REQUIRE,
      'string.min': SignUpValidationMessage.NICKNAME_MIN_LENGTH,
      'string.max': SignUpValidationMessage.NICKNAME_MAX_LENGTH,
    }),
  [UserCreatePayloadKey.EMAIL]: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': SignUpValidationMessage.EMAIL_REQUIRE,
      'string.email': SignUpValidationMessage.EMAIL_WRONG,
    }),
  [UserCreatePayloadKey.PASSWORD]: Joi.string()
    .min(SignUpValidationRule.PASSWORD_MIN_LENGTH)
    .max(SignUpValidationRule.PASSWORD_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': SignUpValidationMessage.PASSWORD_REQUIRE,
      'string.min': SignUpValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': SignUpValidationMessage.PASSWORD_MAX_LENGTH,
    }),
  [UserCreatePayloadKey.BIRTHDATE]: Joi.date().raw().required().messages({
    'date.base': SignUpValidationMessage.BIRTHDATE_REQUIRE,
  }),
});

export { signUp };

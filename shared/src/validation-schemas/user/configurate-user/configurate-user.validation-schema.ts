import { Joi } from '~/helpers/helpers';
import {
  SignUpValidationRule,
  SignUpValidationMessage,
  UserPayloadKey,
} from '~/common/enums/enums';
import { common } from '../common/common.validation-schema';

const configurateUser = common.keys({
  [UserPayloadKey.FIRST_NAME]: Joi.string()
    .trim()
    .min(SignUpValidationRule.FIRST_NAME_MIN_LENGTH)
    .max(SignUpValidationRule.FIRST_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': SignUpValidationMessage.FIRST_NAME_REQUIRE,
      'string.min': SignUpValidationMessage.FIRST_NAME_MIN_LENGTH,
      'string.max': SignUpValidationMessage.FIRST_NAME_MAX_LENGTH,
    }),
  [UserPayloadKey.LAST_NAME]: Joi.string()
    .trim()
    .min(SignUpValidationRule.LAST_NAME_MIN_LENGTH)
    .max(SignUpValidationRule.LAST_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': SignUpValidationMessage.LAST_NAME_REQUIRE,
      'string.min': SignUpValidationMessage.LAST_NAME_MIN_LENGTH,
      'string.max': SignUpValidationMessage.LAST_NAME_MAX_LENGTH,
    }),
  [UserPayloadKey.NICKNAME]: Joi.string()
    .trim()
    .min(SignUpValidationRule.NICKNAME_MIN_LENGTH)
    .max(SignUpValidationRule.NICKNAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': SignUpValidationMessage.NICKNAME_REQUIRE,
      'string.min': SignUpValidationMessage.NICKNAME_MIN_LENGTH,
      'string.max': SignUpValidationMessage.NICKNAME_MAX_LENGTH,
    }),
  [UserPayloadKey.BIRTHDATE]: Joi.date()
    .raw()
    .required()
    .less('now')
    .message(SignUpValidationMessage.BIRTHDATE_LESS_THEN)
    .messages({
      'date.base': SignUpValidationMessage.BIRTHDATE_REQUIRE,
    }),
});

export { configurateUser };

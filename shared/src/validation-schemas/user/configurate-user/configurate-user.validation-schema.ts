import { Joi } from '~/helpers/helpers';
import {
  UserValidationMessage,
  UserValidationRule,
  UserPayloadKey,
} from '~/common/enums/enums';
import { common } from '../common/common.validation-schema';

const configurateUser = common.keys({
  [UserPayloadKey.FIRST_NAME]: Joi.string()
    .trim()
    .min(UserValidationRule.FIRST_NAME_MIN_LENGTH)
    .max(UserValidationRule.FIRST_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': UserValidationMessage.FIRST_NAME_REQUIRE,
      'string.min': UserValidationMessage.FIRST_NAME_MIN_LENGTH,
      'string.max': UserValidationMessage.FIRST_NAME_MAX_LENGTH,
    }),
  [UserPayloadKey.LAST_NAME]: Joi.string()
    .trim()
    .min(UserValidationRule.LAST_NAME_MIN_LENGTH)
    .max(UserValidationRule.LAST_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': UserValidationMessage.LAST_NAME_REQUIRE,
      'string.min': UserValidationMessage.LAST_NAME_MIN_LENGTH,
      'string.max': UserValidationMessage.LAST_NAME_MAX_LENGTH,
    }),
  [UserPayloadKey.NICKNAME]: Joi.string()
    .trim()
    .min(UserValidationRule.NICKNAME_MIN_LENGTH)
    .max(UserValidationRule.NICKNAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': UserValidationMessage.NICKNAME_REQUIRE,
      'string.min': UserValidationMessage.NICKNAME_MIN_LENGTH,
      'string.max': UserValidationMessage.NICKNAME_MAX_LENGTH,
    }),
  [UserPayloadKey.BIRTHDATE]: Joi.date()
    .raw()
    .required()
    .less('now')
    .message(UserValidationMessage.BIRTHDATE_LESS_THEN)
    .messages({
      'date.base': UserValidationMessage.BIRTHDATE_REQUIRE,
    }),
});

export { configurateUser };

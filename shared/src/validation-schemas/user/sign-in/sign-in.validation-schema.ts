import { Joi } from '~/helpers/helpers';
import {
  UserValidationRule,
  UserValidationMessage,
  UserPayloadKey,
} from '~/common/enums/enums';
import { common } from '../common/common.validation-schema';

const signIn = common.keys({
  [UserPayloadKey.PASSWORD]: Joi.string()
    .trim()
    .min(UserValidationRule.PASSWORD_MIN_LENGTH)
    .max(UserValidationRule.PASSWORD_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': UserValidationMessage.PASSWORD_REQUIRE,
      'string.min': UserValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': UserValidationMessage.PASSWORD_MAX_LENGTH,
    }),
});

export { signIn };

import { Joi } from '~/helpers/helpers';
import {
  UserValidationMessage,
  UserValidationRule,
  UserPayloadKey,
} from '~/common/enums/enums';
import { configurateUser } from '../configurate-user/configurate-user.validation-schema';

const signUp = configurateUser.keys({
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

export { signUp };

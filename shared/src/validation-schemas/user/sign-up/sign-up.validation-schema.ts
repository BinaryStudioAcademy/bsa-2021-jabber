import { Joi } from '~/helpers/helpers';
import {
  SignUpValidationRule,
  SignUpValidationMessage,
  UserPayloadKey,
} from '~/common/enums/enums';
import { configurateUser } from '../configurate-user/configurate-user.validation-schema';

const signUp = configurateUser.keys({
  [UserPayloadKey.PASSWORD]: Joi.string()
    .trim()
    .min(SignUpValidationRule.PASSWORD_MIN_LENGTH)
    .max(SignUpValidationRule.PASSWORD_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': SignUpValidationMessage.PASSWORD_REQUIRE,
      'string.min': SignUpValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': SignUpValidationMessage.PASSWORD_MAX_LENGTH,
    }),
});

export { signUp };

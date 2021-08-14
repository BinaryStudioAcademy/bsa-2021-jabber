import { Joi } from '~/helpers/helpers';
import {
  SignUpValidationRule,
  SignUpValidationMessage,
  UserPayloadKey,
} from '~/common/enums/enums';
import { configurateUser } from '../configurate-user/configurate-user.validation-schema';

const userEdit = configurateUser.keys({
  [UserPayloadKey.PASSWORD]: Joi.string()
    .trim()
    .min(SignUpValidationRule.PASSWORD_MIN_LENGTH)
    .max(SignUpValidationRule.PASSWORD_MAX_LENGTH)
    .messages({
      'string.min': SignUpValidationMessage.PASSWORD_MIN_LENGTH,
      'string.max': SignUpValidationMessage.PASSWORD_MAX_LENGTH,
    })
    .allow(null, ''),
});

export { userEdit };

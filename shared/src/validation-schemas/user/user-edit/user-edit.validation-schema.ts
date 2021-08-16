import { Joi } from '~/helpers/helpers';
import {
  UserValidationRule,
  UserValidationMessage,
  UserPayloadKey,
} from '~/common/enums/enums';
import { configurateUser } from '../configurate-user/configurate-user.validation-schema';

const userEdit = configurateUser.keys({
  [UserPayloadKey.BIO]: Joi.string()
    .trim()
    .max(UserValidationRule.BIO_MAX_LENGTH)
    .messages({
      'string.max': UserValidationMessage.BIO_MAX_LENGTH,
    })
    .allow(''),
});

export { userEdit };

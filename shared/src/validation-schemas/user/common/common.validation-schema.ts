import { Joi } from '~/helpers/helpers';
import { UserValidationMessage, UserPayloadKey } from '~/common/enums/enums';

const common = Joi.object({
  [UserPayloadKey.EMAIL]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': UserValidationMessage.EMAIL_WRONG,
      'string.empty': UserValidationMessage.EMAIL_REQUIRE,
    }),
});

export { common };

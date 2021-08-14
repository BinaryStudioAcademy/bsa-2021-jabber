import { Joi } from '~/helpers/helpers';
import { SignInValidationMessage, UserPayloadKey } from '~/common/enums/enums';

const common = Joi.object({
  [UserPayloadKey.EMAIL]: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': SignInValidationMessage.EMAIL_WRONG,
      'any.required': SignInValidationMessage.EMAIL_REQUIRED,
    }),
});

export { common };

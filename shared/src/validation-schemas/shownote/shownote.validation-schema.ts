import { Joi } from '~/helpers/helpers';
import {
  ShownotePayloadKey,
  ShownoteValidationMessage,
  ShownoteValidationRule,
} from '~/common/enums/enums';

const shownote = Joi.object({
  [ShownotePayloadKey.NAME]: Joi.string()
    .trim()
    .min(ShownoteValidationRule.SHOWNOTE_NAME_MIN_LENGTH)
    .max(ShownoteValidationRule.SHOWNOTE_NAME_MAX_LENGTH)
    .required()
    .messages({
      'string.empty': ShownoteValidationMessage.SHOWNOTE_NAME_REQUIRE,
      'string.min': ShownoteValidationMessage.SHOWNOTE_NAME_MIN_LENGTH,
      'string.max': ShownoteValidationMessage.SHOWNOTE_NAME_MAX_LENGTH,
    }),
  [ShownotePayloadKey.TIMESTAMP]: Joi.number()
    .integer()
    .min(ShownoteValidationRule.TIMESTAMP_MIN_VALUE)
    .required()
    .messages({
      'number.required': ShownoteValidationMessage.TIMESTAMP_REQUIRE,
      'number.base': ShownoteValidationMessage.TIMESTAMP_BASE,
      'number.integer': ShownoteValidationMessage.TIMESTAMP_NUMBER_FORMAT,
      'number.min': ShownoteValidationMessage.TIMESTAMP_MIN_VALUE,
    }),
});

export { shownote };

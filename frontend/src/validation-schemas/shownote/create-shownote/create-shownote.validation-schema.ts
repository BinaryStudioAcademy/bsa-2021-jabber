import { Joi } from 'helpers/helpers';
import {
  ShownotePayloadKey,
  ShownoteValidationMessage,
  ShownoteValidationRule,
} from 'common/enums/enums';
import { shownote } from 'jabber-shared/validation-schemas/validation-schemas';

const shownoteCreate = shownote.keys({
  [ShownotePayloadKey.MINUTES]: Joi.number()
    .integer()
    .min(ShownoteValidationRule.MINUTES_MIN_VALUE)
    .required()
    .messages({
      'number.required': ShownoteValidationMessage.MINUTES_REQUIRE,
      'number.base': ShownoteValidationMessage.MINUTES_BASE,
      'number.integer': ShownoteValidationMessage.MINUTES_NUMBER_FORMAT,
      'number.min': ShownoteValidationMessage.MINUTES_MIN_VALUE,
    }),
  [ShownotePayloadKey.SECONDS]: Joi.number()
    .integer()
    .min(ShownoteValidationRule.SECONDS_MIN_VALUE)
    .max(ShownoteValidationRule.SECONDS_MAX_VALUE)
    .required()
    .messages({
      'number.required': ShownoteValidationMessage.SECONDS_REQUIRE,
      'number.base': ShownoteValidationMessage.SECONDS_BASE,
      'number.integer': ShownoteValidationMessage.SECONDS_NUMBER_FORMAT,
      'number.min': ShownoteValidationMessage.SECONDS_MIN_VALUE,
      'number.max': ShownoteValidationMessage.SECONDS_MAX_VALUE,
    }),
});

export { shownoteCreate };

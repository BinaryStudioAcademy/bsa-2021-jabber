import { ShownotePayloadKey } from 'common/enums/enums';
import { Joi } from 'helpers/helpers';
import { shownoteCommon } from 'jabber-shared/validation-schemas/validation-schemas';
import {
  ShownoteValidationMessage,
  ShownoteValidationRule,
} from 'jabber-shared/common/enums/enums';

const shownoteCreate = shownoteCommon.keys({
  [ShownotePayloadKey.MINUTES]: Joi.number()
    .min(ShownoteValidationRule.MINUTES_MIN_VALUE)
    .required()
    .messages({
      'number.base': ShownoteValidationMessage.MINUTES_BASE,
      'number.min': ShownoteValidationMessage.MINUTES_MIN_VALUE,
    }),
  [ShownotePayloadKey.SECONDS]: Joi.number()
    .min(ShownoteValidationRule.SECONDS_MIN_VALUE)
    .max(ShownoteValidationRule.SECONDS_MAX_VALUE)
    .required()
    .messages({
      'number.base': ShownoteValidationMessage.SECONDS_BASE,
      'number.min': ShownoteValidationMessage.SECONDS_MIN_VALUE,
      'number.max': ShownoteValidationMessage.SECONDS_MAX_VALUE,
    }),
});

export { shownoteCreate };

import { Joi } from '~/helpers/helpers';
import {
  ShownotePayloadKey,
  ShownoteValidationMessage,
  ShownoteValidationRule,
} from '~/common/enums/enums';
import { common } from '../common/common.validation-schema';

const shownoteCreate = common.keys({
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

export { shownoteCreate };

import * as Joi from 'joi';
import { ImageValidationMessage, ImageUploadKey } from '~/common/enums/enums';
import { ImageUploadPayload } from '~/common/types/types';

const image = Joi.object<ImageUploadPayload>({
  [ImageUploadKey.DATA_URL]: Joi.string()
    .uri()
    .pattern(/^data:image\/(jpeg|png|svg\+xml);base64,.*/)
    .messages({
      'string.uri': ImageValidationMessage.DATA_URL_FORMAT,
      'string.pattern': ImageValidationMessage.DATA_URL_FORMAT,
    }),
  [ImageUploadKey.USER_ID]: Joi.number().integer().required().messages({
    'number.required': ImageValidationMessage.USER_ID_REQUIRE,
    'number.integer': ImageValidationMessage.USER_ID_NUMBER_FORMAT,
  }),
});

export { image };

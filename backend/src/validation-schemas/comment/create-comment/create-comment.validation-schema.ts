import { Joi } from '~/helpers/helpers';
import { comment } from 'jabber-shared/validation-schemas/validation-schemas';
import {
  CommentCreatePayloadKey,
  CommentValidationMessage,
} from '~/common/enums/enums';

const commentCreate = comment.keys({
  [CommentCreatePayloadKey.USER_ID]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.required': CommentValidationMessage.USER_ID_REQUIRE,
      'number.integer': CommentValidationMessage.USER_ID_NUMBER_FORMAT,
    }),
  [CommentCreatePayloadKey.EPISODE_ID]: Joi.number()
    .integer()
    .required()
    .messages({
      'number.required': CommentValidationMessage.EPISODE_ID_REQUIRE,
      'number.integer': CommentValidationMessage.EPISODE_ID_NUMBER_FORMAT,
    }),
});

export { commentCreate };

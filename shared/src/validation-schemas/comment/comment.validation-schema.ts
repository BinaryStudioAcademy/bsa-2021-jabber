import { Joi } from '~/helpers/helpers';
import {
  CommentValidationRule,
  CommentValidationMessage,
  CommentCreatePayloadKey,
} from '~/common/enums/enums';
import { CommentCreatePayload } from '~/common/types/types';

const comment = Joi.object<CommentCreatePayload>({
  [CommentCreatePayloadKey.TEXT]: Joi.string()
    .trim()
    .min(CommentValidationRule.COMMENT_TEXT_MIN_LENGTH)
    .required()
    .messages({
      'string.empty': CommentValidationMessage.COMMENT_TEXT_REQUIRE,
      'string.min': CommentValidationMessage.COMMENT_TEXT_MIN_LENGTH,
    }),
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

export { comment };

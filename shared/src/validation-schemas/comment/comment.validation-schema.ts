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
  [CommentCreatePayloadKey.TIMESTAMP]: Joi.number()
    .integer()
    .required(),
});

export { comment };

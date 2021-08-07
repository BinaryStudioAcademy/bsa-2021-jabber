import { CommentValidationRule } from './comment-validation-rule.enum';

const CommentValidationMessage = {
  COMMENT_TEXT_REQUIRE: 'Comment text is required',
  COMMENT_TEXT_MIN_LENGTH: `Comment text must be at least ${CommentValidationRule.COMMENT_TEXT_MIN_LENGTH} character long`,
} as const;

export { CommentValidationMessage };

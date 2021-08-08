import { CommentValidationRule } from './comment-validation-rule.enum';

const CommentValidationMessage = {
  COMMENT_TEXT_REQUIRE: 'Comment text is required',
  COMMENT_TEXT_MIN_LENGTH: `Comment text must be at least ${CommentValidationRule.COMMENT_TEXT_MIN_LENGTH} character long`,
  USER_ID_REQUIRE: 'User id is required',
  USER_ID_NUMBER_FORMAT: 'User id must be an integer',
  EPISODE_ID_REQUIRE: 'Episode id is required',
  EPISODE_ID_NUMBER_FORMAT: 'Episode id must be an integer',
} as const;

export { CommentValidationMessage };

enum ErrorMessage {
  NOT_FOUND = 'Entity not found.',
  BAD_REQUEST = 'Bad Request',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  USER_NOT_FOUND = 'User not found',
  WRONG_PASSWORD = 'Wrong password',
  UNAUTHORIZED_TOKEN = 'No token provided',
  BAD_TOKEN = 'Token is invalid',
  EMAIL_IS_ALREADY_TAKEN = 'Email is already taken',
  PODCAST_NOT_FOUND = 'Podcast not found',
  EPISODE_NOT_FOUND = 'Episode not found',
  COMMENT_NOT_FOUND = 'Comment not found',
  NOT_YOURS_PODCAST = 'This podcast not yours',
  NOT_YOURS_EPISODE = 'This episode not yours',
  NOT_YOURS_COMMENT = 'This comment not yours',
  NO_PERMISSION_TO_EDIT_USER = 'You do not have permission to edit',
  ALREADY_FOLLOWING = 'Already following',
  ALREADY_LIKED = 'Already liked',
}

export { ErrorMessage };

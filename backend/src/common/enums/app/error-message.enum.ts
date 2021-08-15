enum ErrorMessage {
  NOT_FOUND = 'Entity not found.',
  BAD_REQUEST = 'Bad Request',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  USER_NOT_FOUND = 'User not found',
  WRONG_PASSWORD = 'Wrong password',
  UNAUTHORIZED_TOKEN = 'No token provided',
  BAD_TOKEN = 'Token is invalid',
  EMAIL_IS_ALREADY_TAKEN = 'Email is already taken',
  EPISODE_NOT_FOUND = 'Episode not found',
  PODCAST_NOT_FOUND = 'Podcast not found',
  NOT_YOURS_PODCAST = 'This podcast not yours',
  NOT_YOURS_EPISODE = 'This episode not yours',
}

export { ErrorMessage };

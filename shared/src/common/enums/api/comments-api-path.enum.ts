enum CommentsApiPath {
  ROOT = '/',
  $ID = '/:id',
  EPISODE = '/episode',
  EPISODE_ID = '/episode/:id',
  COMMENT_REACTIONS = '/comment-reactions',
  COMMENT_REACTIONS_$COMMENT_ID = '/comment-reactions/:commentId',
}

export { CommentsApiPath };

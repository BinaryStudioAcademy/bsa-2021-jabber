enum PlaylistsApiPath {
  ROOT = '/',
  $ID = '/:id',
  USERS = '/users',
  USERS_$USER_ID = '/users/:userId',
  EPISODES = '/episodes',
  INVITE = '/invite',
  $PLAYLIST_ID_EPISODES = '/:id/episodes',
  POPULAR = '/popular',
  INVITE_$CODE = '/invite/:code'
}

export { PlaylistsApiPath };

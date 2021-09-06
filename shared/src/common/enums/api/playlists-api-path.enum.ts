enum PlaylistsApiPath {
  ROOT = '/',
  $ID = '/:id',
  USERS = '/users',
  USERS_$USER_ID = '/users/:userId',
  EPISODES = '/episodes',
  $PLAYLIST_ID_EPISODES = '/:id/episodes',
  POPULAR = '/popular',
}

export { PlaylistsApiPath };

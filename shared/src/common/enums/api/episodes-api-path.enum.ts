enum EpisodesApiPath {
  ROOT = '/',
  $ID = '/:id',
  PODCAST = '/podcast',
  PODCAST_$ID = '/podcast/:id',
  FAVOURITES = '/favourites',
  FAVOURITES_$USER_ID = '/favourites/:userId',
  FAVOURITES_$ID_EPISODES = '/favourites/:id/episodes',
  POPULAR = '/popular',
  PLAYLIST_$ID_EPISODES = '/playlists/:playlistId/episodes',
}

export { EpisodesApiPath };

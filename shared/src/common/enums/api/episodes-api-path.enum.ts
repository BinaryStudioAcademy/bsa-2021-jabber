enum EpisodesApiPath {
  ROOT = '/',
  $ID = '/:id',
  PODCAST = '/podcast',
  PODCAST_$ID = '/podcast/:id',
  FAVOURITES = '/favourites',
  FAVOURITES_$USER_ID = '/favourites/:userId',
  FAVOURITES_$ID_EPISODES = '/favourites/:id/episodes',
  POPULAR = '/popular',
}

export { EpisodesApiPath };

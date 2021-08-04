enum AppRoute {
  ROOT = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  PODCASTS = '/podcasts',
  PODCASTS_$ID = '/podcasts/:id',
  PODCASTS_EDIT = '/podcasts/edit',
  PODCASTS_EDIT_$ID = '/podcasts/edit/:id?',
  PODCASTS_$ID_EPISODES_$ID = '/podcasts/:podcastId/episodes/:episodeId',
  PODCAST_$ID_EPISODE_EDIT_$ID = '/podcasts/:podcastId/episode/edit/:episodeId?',
  EPISODE = '/episodes',
  EPISODE_EDIT = '/episodes/edit',
  ANY = '*',
}

export { AppRoute };

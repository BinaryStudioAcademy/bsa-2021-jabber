enum AppRoute {
  ROOT = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  PODCASTS = '/podcasts',
  PODCASTS_$ID = '/podcasts/:podcastId',
  PODCAST_EDIT = '/podcasts/edit',
  PODCAST_EDIT_$ID = '/podcasts/edit/:id?',
  PODCAST_$ID_EPISODE_$ID  = '/podcasts/:podcastId/episode/:episodeId',
  ANY = '*',
}

export { AppRoute };

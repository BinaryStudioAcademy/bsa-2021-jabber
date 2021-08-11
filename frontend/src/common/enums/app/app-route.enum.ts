enum AppRoute {
  ROOT = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  PODCASTS = '/podcasts',
  PODCASTS_$ID = '/podcasts/:id',
  PODCASTS_EDIT = '/podcasts/edit',
  PODCASTS_EDIT_$ID = '/podcasts/edit/:id?',
  PODCASTS_$ID_EPISODEs_EDIT = '/podcasts/:podcastId/episodes/edit',
  PODCASTS_$ID_EPISODES_EDIT_$ID = '/podcasts/:podcastId/episodes/edit/:id?',
  PODCASTS_$ID_LIVE = '/podcasts/:id/live',
  EPISODES_$ID_LIVE = '/episodes/:id/live',
  LIVE = '/live',
  EPISODES = '/episodes',
  EPISODES_$ID = '/episodes/:id',
  EPISODES_EDIT = '/episodes/edit',
  EPISODES_EDIT_$ID = '/episodes/edit/:id?',
  USERS = '/users',
  USERS_ID = '/users/:id',
  ANY = '*',
}

export { AppRoute };

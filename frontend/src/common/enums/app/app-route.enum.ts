enum AppRoute {
  ROOT = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  PODCASTS = '/podcasts',
  PODCASTS_$ID = '/podcasts/:id',
  PODCASTS_EDIT = '/podcasts/edit',
  PODCASTS_EDIT_$ID = '/podcasts/edit/:id?',
  EPISODES_$ID = '/episodes/:id',
  EPISODE_EDIT = '/episode/edit',
  EPISODE_EDIT_$ID = '/episode/edit/:id?',
  ANY = '*',
}

export { AppRoute };

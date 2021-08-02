enum AppRoute {
  ROOT = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  POCAST_EDIT_$ID = '/podcasts/edit/:id?',
  EPISODE_CREATE_$ID = '/podcasts/:podcastId/create',
  ANY = '*',
}

export { AppRoute };

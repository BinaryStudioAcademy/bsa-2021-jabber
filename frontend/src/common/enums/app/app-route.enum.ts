enum AppRoute {
  ROOT = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  PODCAST = '/podcast',
  PODCAST_$ID = '/podcasts/:id',
  PODCAST_EDIT = '/podcasts/edit',
  PODCAST_EDIT_$ID = '/podcasts/edit/:id?',
  ANY = '*',
}

export { AppRoute };

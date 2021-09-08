enum PodcastsApiPath {
  ROOT = '/',
  $ID = '/:id',
  SEARCH = '/search',
  USERS = '/users',
  USERS_$ID = '/users/:id',
  INVITE = '/invite',
  INVITE_$CODE = '/invite/:code',
  INVITATION_CODE = '/invitation-code',
  INVITATION_CODE_$ID = '/invitation-code/:id',
  POPULAR = '/popular',
}

export { PodcastsApiPath };

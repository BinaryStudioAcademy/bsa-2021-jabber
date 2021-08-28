enum UserFollowersApiPath {
  ROOT = '/',
  $ID = '/:id',
  $USER_ID_$FOLLOWER_ID = '/:userId/:followerId',
  $USER_ID_FOLLOWERS = '/:userId/followers',
}

export { UserFollowersApiPath };

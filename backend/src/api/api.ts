import { Router } from 'express';
import { ENV } from '~/common/enums/enums';
import {
  auth as authService,
  user as userService,
  podcast as podcastService,
  episode as episodeService,
  comment as commentService,
  record as recordService,
  genre as genreService,
  commentReaction as commentReactionService,
  userFollower as userFollowerService,
  podcastFollower as podcastFollowerService,
} from '~/services/services';
import { initAuthApi } from './auth/auth.api';
import { initUsersApi } from './users/users.api';
import { initPodcastsApi } from './podcasts/podcasts.api';
import { initEpisodesApi } from './episodes/episodes.api';
import { initCommentsApi } from './comments/comments.api';
import { initRecordsApi } from './records/records.api';
import { initGenreApi } from './genre/genre.api';
import { initCommentReactionsApi } from './comment-reactions/comment-reactions.api';
import { initUserFollowersApi } from './user-followers/user-followers.api';
import { initPodcastFollowersApi } from './podcast-followers/podcast-followers.api';

const initApi = (app: Router): Router => {
  const apiRouter = Router();

  app.use(ENV.API.V1_PREFIX, apiRouter);

  initAuthApi({
    apiRouter,
    authService,
  });

  initUsersApi({
    apiRouter,
    userService,
  });

  initPodcastsApi({
    apiRouter,
    podcastService,
  });

  initEpisodesApi({
    apiRouter,
    episodeService,
  });

  initCommentsApi({
    apiRouter,
    commentService,
  });

  initRecordsApi({
    apiRouter,
    recordService,
  });

  initGenreApi({
    apiRouter,
    genreService,
  });

  initCommentReactionsApi({
    apiRouter,
    commentReactionService,
  });

  initUserFollowersApi({
    apiRouter,
    userFollowerService,
  });

  initPodcastFollowersApi({
    apiRouter,
    podcastFollowerService,
  });

  return apiRouter;
};

export { initApi };

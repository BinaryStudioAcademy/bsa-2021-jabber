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
} from '~/services/services';
import { initAuthApi } from './auth/auth.api';
import { initUsersApi } from './users/users.api';
import { initPodcastsApi } from './podcasts/podcasts.api';
import { initEpisodesApi } from './episodes/episodes.api';
import { initCommentsApi } from './comments/comments.api';
import { initRecordsApi } from './records/records.api';
import { initGenreApi } from './genre/genre.api';
import { initCommentReactionsApi } from './comment-reactions/comment-reactions.api';

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

  return apiRouter;
};

export { initApi };

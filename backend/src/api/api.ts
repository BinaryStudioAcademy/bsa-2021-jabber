import { Router } from 'express';
import { ENV } from '~/common/enums/enums';
import {
  auth as authService,
  user as userService,
  podcast as podcastService,
  image as imageService,
  episode as episodeService,
  comment as commentService,
  record as recordService,
  fileStorage as fileStorageService,
} from '~/services/services';
import { initAuthApi } from './auth/auth.api';
import { initUsersApi } from './users/users.api';
import { initPodcastsApi } from './podcasts/podcasts.api';
import { initEpisodesApi } from './episodes/episodes.api';
import { initCommentsApi } from './comments/comments.api';
import { initRecordsApi } from './records/records.api';
import { initFileApi } from './image/image.api';

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

  initFileApi({
    apiRouter,
    fileStorageService,
  });

  return apiRouter;
};

export { initApi };

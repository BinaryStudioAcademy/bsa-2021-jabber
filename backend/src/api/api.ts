import { Router } from 'express';
import { ENV } from '~/common/enums/enums';
import { auth as authService, user as userService, episode as episodeService } from '~/services/services';
import { initAuthApi } from './auth/auth.api';
import { initUsersApi } from './users/users.api';
import { initEpisodesApi } from './episodes/episodes.api';

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

  initEpisodesApi({
    apiRouter,
    episodeService,
  });

  return apiRouter;
};

export { initApi };

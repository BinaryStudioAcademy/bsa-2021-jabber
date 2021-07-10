import { Router } from 'express';
import { ENV } from '~/common/enums/enums';
import { initUserApi } from './user/user.api';

const apis = [initUserApi];

const initApi = (app: Router): Router => {
  const apiRouter = Router();
  app.use(ENV.API.V1_PREFIX, apiRouter);

  apis.forEach((api) => api(apiRouter));

  return apiRouter;
};

export { initApi };

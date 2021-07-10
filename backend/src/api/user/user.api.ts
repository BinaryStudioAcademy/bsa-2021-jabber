import { Router } from 'express';
import { ApiPath, HttpCode, UsersApiPath } from '~/common/enums/enums';

const initUserApi = (apiRouter: Router): Router => {
  const userRouter = Router();

  apiRouter.use(ApiPath.USERS, userRouter);

  userRouter.get(UsersApiPath.ROOT, (_req, res) => {
    return res.status(HttpCode.OK).json({
      name: 'User Name',
    });
  });

  return userRouter;
};

export { initUserApi };

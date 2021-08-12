import { Router } from 'express';
import { ApiPath, HttpCode, HttpMethod, UsersApiPath } from '~/common/enums/enums';
import { handleAsyncApi } from '~/helpers/helpers';
import { user as userService } from '~/services/services';
import { checkAuth } from '~/middlewares/middlewares';

type Args = {
  apiRouter: Router;
  userService: typeof userService;
};

const initUsersApi = ({ apiRouter, userService }: Args): Router => {
  const userRouter = Router();

  apiRouter.use(ApiPath.USERS, userRouter);

  userRouter.get(
    UsersApiPath.ROOT,
    checkAuth(HttpMethod.GET),
    handleAsyncApi(async (_req, res) => {
      return res.json(await userService.getAll()).status(HttpCode.OK);
    }),
  );

  userRouter.get(
    UsersApiPath.$ID,
    checkAuth(HttpMethod.GET),
    handleAsyncApi(async (_req, res) => {
      return res.json(await userService.getById(Number(_req.params.id))).status(HttpCode.OK);
    }),
  );

  return userRouter;
};

export { initUsersApi };

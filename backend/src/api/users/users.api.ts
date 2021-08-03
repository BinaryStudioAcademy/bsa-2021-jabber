import { Router } from 'express';
import { ApiPath, HttpCode, UsersApiPath } from '~/common/enums/enums';
import { handleAsyncApi } from '~/helpers/helpers';
import { user as userService } from '~/services/services';

type Args = {
  apiRouter: Router;
  userService: typeof userService;
};

const initUsersApi = ({ apiRouter, userService }: Args): Router => {
  const userRouter = Router();

  apiRouter.use(ApiPath.USERS, userRouter);

  userRouter.get(
    UsersApiPath.ROOT,
    handleAsyncApi(async (_req, res) => {
      return res.json(await userService.getAll()).status(HttpCode.OK);
    }),
  );

  return userRouter;
};

export { initUsersApi };

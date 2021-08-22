import { Router } from 'express';
import { ApiPath, HttpCode, UserFollowersApiPath, HttpMethod } from '~/common/enums/enums';
import { userFollower as userFollowerService } from '~/services/services';
import { handleAsyncApi } from '~/helpers/helpers';
import {
  checkAuth as checkAuthMiddleware,
  validateSchema as validateSchemaMiddleware,
} from '~/middlewares/middlewares';
import { userFollower as userFollowerValidationSchema } from '~/validation-schemas/validation-schemas';

type Args = {
  apiRouter: Router;
  userFollowerService: typeof userFollowerService;
};

const initUserFollowersApi = ({ apiRouter, userFollowerService }: Args): Router => {
  const userFollowerRouter = Router();

  apiRouter.use(ApiPath.USER_FOLLOWERS, userFollowerRouter);

  userFollowerRouter.get(
    UserFollowersApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (req, res) => {
      const userFollower = await userFollowerService.isFollowed(req.body);
      return res.json(userFollower).status(HttpCode.OK);
    }),
  );

  userFollowerRouter.post(
    UserFollowersApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.POST),
    validateSchemaMiddleware(userFollowerValidationSchema),
    handleAsyncApi(async (req, res) => {
      const userFollower = await userFollowerService.create(req.body);
      return res.json(userFollower).status(HttpCode.CREATED);
    }),
  );

  userFollowerRouter.delete(
    UserFollowersApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.DELETE),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await userFollowerService.delete(req.body))
        .status(HttpCode.OK);
    }),
  );

  return userFollowerRouter;
};

export { initUserFollowersApi };

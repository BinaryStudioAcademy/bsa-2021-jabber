import { Router } from 'express';
import { ApiPath, HttpCode, UserFollowersApiPath, HttpMethod, RouterParam } from '~/common/enums/enums';
import { userFollower as userFollowerService } from '~/services/services';
import { handleAsyncApi } from '~/helpers/helpers';
import {
  checkAuth as checkAuthMiddleware,
  validateSchema as validateSchemaMiddleware,
  checkParamsIsValid as checkParamsIsValidMiddleware,
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
    UserFollowersApiPath.$ID,
    checkParamsIsValidMiddleware(RouterParam.ID),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await userFollowerService.getCountByUserId(Number(req.params.id)))
        .status(HttpCode.OK);
    }),
  );

  userFollowerRouter.get(
    UserFollowersApiPath.$USER_ID_$FOLLOWER_ID,
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (req, res) => {
      const isFollowed = await userFollowerService.checkIsFollowed({
        userId: Number(req.params.userId),
        followerId: Number(req.params.followerId),
      });

      return res.json(isFollowed).status(HttpCode.OK);
    }),
  );

  userFollowerRouter.post(
    UserFollowersApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.POST),
    validateSchemaMiddleware(userFollowerValidationSchema),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await userFollowerService.create(req.body))
        .status(HttpCode.CREATED);
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

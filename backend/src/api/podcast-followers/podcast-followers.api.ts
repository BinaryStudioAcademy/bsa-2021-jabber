import { Router } from 'express';
import { ApiPath, HttpCode, PodcastsFollowersApiPath, HttpMethod } from '~/common/enums/enums';
import { podcastFollower as podcastFollowerService } from '~/services/services';
import { handleAsyncApi } from '~/helpers/helpers';
import {
  checkAuth as checkAuthMiddleware,
  validateSchema as validateSchemaMiddleware,
  checkParamsIsValid as checkParamsIsValidMiddleware,
} from '~/middlewares/middlewares';
import { podcastFollower as podcastFollowerValidationSchema } from '~/validation-schemas/validation-schemas';

type Args = {
  apiRouter: Router;
  podcastFollowerService: typeof podcastFollowerService;
};

const initPodcastFollowersApi = ({ apiRouter, podcastFollowerService }: Args): Router => {
  const podcastFollowerRouter = Router();

  apiRouter.use(ApiPath.PODCAST_FOLLOWERS, podcastFollowerRouter);

  podcastFollowerRouter.get(
    PodcastsFollowersApiPath.$ID,
    checkParamsIsValidMiddleware(),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await podcastFollowerService.getCountByPodcastId(Number(req.params.id)))
        .status(HttpCode.OK);
    }),
  );

  podcastFollowerRouter.get(
    PodcastsFollowersApiPath.$PODCAST_ID_$FOLLOWER_ID,
    checkParamsIsValidMiddleware(),
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (req, res) => {
      const isFollowed = await podcastFollowerService.checkIsFollowed({
        podcastId: Number(req.params.podcastId),
        followerId: Number(req.params.followerId),
      });

      return res.json(isFollowed).status(HttpCode.OK);
    }),
  );

  podcastFollowerRouter.post(
    PodcastsFollowersApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.POST),
    validateSchemaMiddleware(podcastFollowerValidationSchema),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await podcastFollowerService.create(req.body))
        .status(HttpCode.CREATED);
    }),
  );

  podcastFollowerRouter.delete(
    PodcastsFollowersApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.DELETE),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await podcastFollowerService.delete(req.body))
        .status(HttpCode.OK);
    }),
  );

  return podcastFollowerRouter;
};

export { initPodcastFollowersApi };

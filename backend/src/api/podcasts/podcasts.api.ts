import { Router } from 'express';
import {
  podcastCreate as podcastCreateValidationSchema,
  podcastEdit as editPodcastValidationSchema,
} from '~/validation-schemas/validation-schemas';
import { ApiPath, HttpCode, PodcastsApiPath, HttpMethod } from '~/common/enums/enums';
import { PodcastLoadFilter, User } from '~/common/types/types';
import { handleAsyncApi } from '~/helpers/helpers';
import {
  checkAuth as checkAuthMiddleware,
  checkUserPodcastOwner as checkUserPodcastOwnerMiddleware,
  validateSchema as validateSchemaMiddleware,
  CheckUserHasPermitToPodcast as CheckUserHasPermitToPodcastMiddleware,
} from '~/middlewares/middlewares';
import { podcast as podcastService } from '~/services/services';

type Args = {
  apiRouter: Router;
  podcastService: typeof podcastService;
};

const initPodcastsApi = ({ apiRouter, podcastService }: Args): Router => {
  const podcastRouter = Router();

  apiRouter.use(ApiPath.PODCASTS, podcastRouter);

  podcastRouter.get(
    PodcastsApiPath.ROOT,
    handleAsyncApi(async (req, res) => {
      return res.json(await podcastService.getByQuery(req.query as unknown as PodcastLoadFilter)).status(HttpCode.OK);
    }),
  );

  podcastRouter.get(
    PodcastsApiPath.USERS_$ID,
    handleAsyncApi(async (req, res) => {
      return res
        .send(await podcastService.getAllByUserId(Number(req.params.id), Number(req.user?.id)))
        .status(HttpCode.OK);
    }),
  );

  podcastRouter.get(
    PodcastsApiPath.$ID,
    CheckUserHasPermitToPodcastMiddleware(),
    handleAsyncApi(async (req, res) => {
      return res
        .send(await podcastService.getById(Number(req.params.id)))
        .status(HttpCode.OK);
    }),
  );

  podcastRouter.post(
    PodcastsApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.POST),
    validateSchemaMiddleware(podcastCreateValidationSchema),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await podcastService.create(req.body))
        .status(HttpCode.CREATED);
    }),
  );

  podcastRouter.put(
    PodcastsApiPath.$ID,
    checkAuthMiddleware(HttpMethod.PUT),
    checkUserPodcastOwnerMiddleware(),
    validateSchemaMiddleware(editPodcastValidationSchema),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await podcastService.update(req.params.id, req.body))
        .status(HttpCode.OK);
    }),
  );

  podcastRouter.delete(
    PodcastsApiPath.$ID,
    checkAuthMiddleware(HttpMethod.DELETE),
    checkUserPodcastOwnerMiddleware(),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await podcastService.delete(Number(req.params.id)))
        .status(HttpCode.OK);
    }),
  );

  podcastRouter.get(
    PodcastsApiPath.INVITE_$CODE,
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await podcastService.invite(req.params.code, (<User>req.user).id))
        .status(HttpCode.OK);
    }),
  );

  return podcastRouter;
};

export { initPodcastsApi };

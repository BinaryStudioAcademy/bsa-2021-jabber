import { Router } from 'express';
import {
  episodeCreate as episodeCreateValidationSchema,
  episodeEdit as episodeEditValidationSchema,
} from '~/validation-schemas/validation-schemas';
import { ApiPath, HttpCode, EpisodesApiPath, HttpMethod } from '~/common/enums/enums';
import { episode as episodeService } from '~/services/services';
import { handleAsyncApi } from '~/helpers/helpers';
import {
  checkAuth as checkAuthMiddleware,
  checkUserOwner as checkUserOwnerMiddleware,
  validateSchema as validateSchemaMiddleware,
} from '~/middlewares/middlewares';

type Args = {
  apiRouter: Router;
  episodeService: typeof episodeService;
};

const initEpisodesApi = ({ apiRouter, episodeService }: Args): Router => {
  const episodeRouter = Router();

  apiRouter.use(ApiPath.EPISODES, episodeRouter);

  episodeRouter.get(
    EpisodesApiPath.ROOT,
    handleAsyncApi(async (_req, res) => {
      return res.json(await episodeService.getAll()).status(HttpCode.OK);
    }),
  );

  episodeRouter.get(
    EpisodesApiPath.$ID,
    handleAsyncApi(async (req, res) => {
      return res
        .send(await episodeService.getById(req.params.id))
        .status(HttpCode.OK);
    }),
  );

  episodeRouter.get(
    EpisodesApiPath.PODCAST_$ID,
    handleAsyncApi(async (req, res) => {
      return res
        .send(await episodeService.getAllByPodcastId(req.params.id))
        .status(HttpCode.OK);
    }),
  );

  episodeRouter.post(
    EpisodesApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.POST),
    checkUserOwnerMiddleware(),
    validateSchemaMiddleware(episodeCreateValidationSchema),
    handleAsyncApi(async (req, res) => {
      const episode = await episodeService.create(req.body);
      return res.json(episode).status(HttpCode.CREATED);
    }),
  );

  episodeRouter.put(
    EpisodesApiPath.$ID,
    checkAuthMiddleware(HttpMethod.PUT),
    validateSchemaMiddleware(episodeEditValidationSchema),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await episodeService.update(req.params.id, req.body))
        .status(HttpCode.OK);
    }),
  );

  return episodeRouter;
};

export { initEpisodesApi };

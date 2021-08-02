import { Router } from 'express';
import { podcast as podcastValidationSchema } from '~/validation-schemas/validation-schemas';
import { ApiPath, HttpCode, PodcastsApiPath } from '~/common/enums/enums';
import { handleAsyncApi } from '~/helpers/helpers';
import { validateSchema as validateSchemaMiddleware } from '~/middlewares/middlewares';
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
    handleAsyncApi(async (_req, res) => {
      return res.json(await podcastService.getAll()).status(HttpCode.OK);
    }),
  );

  podcastRouter.post(
    PodcastsApiPath.ROOT,
    validateSchemaMiddleware(podcastValidationSchema),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await podcastService.create(req.body))
        .status(HttpCode.CREATED);
    }),
  );

  return podcastRouter;
};

export { initPodcastsApi };

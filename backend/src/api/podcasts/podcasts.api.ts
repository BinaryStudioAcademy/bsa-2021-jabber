import { Router } from 'express';
import { ApiPath, HttpCode, PodcastsApiPath } from '~/common/enums/enums';
import { handleAsyncApi } from '~/helpers/helpers';
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
    handleAsyncApi(async (_req, res) => {
      return res.json(await podcastService.create(_req.body)).status(HttpCode.OK);
    }),
  );

  return podcastRouter;
};

export { initPodcastsApi };

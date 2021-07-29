import { Router } from 'express';
import { ApiPath, HttpCode, EpisodesApiPath } from '~/common/enums/enums';
import { episode as episodeService } from '~/services/services';
import { handleAsyncApi } from '~/helpers/helpers';

type Args = {
  apiRouter: Router;
  episodeService: typeof episodeService
}

const initEpisodesApi = ({ apiRouter, episodeService }: Args): Router => {
  const episodeRouter = Router();

  apiRouter.use(ApiPath.EPISODES, episodeRouter);

  episodeRouter.get(
    EpisodesApiPath.ROOT,
    handleAsyncApi(async (_req, res) => {
      return res.json(await episodeService.getAll()).status(HttpCode.OK)
    })
  );

  return episodeRouter;
};

export { initEpisodesApi };

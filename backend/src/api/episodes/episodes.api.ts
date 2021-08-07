import { Router } from 'express';
import { episode as EpisodeValidationSchema } from '~/validation-schemas/validation-schemas';
import { ApiPath, HttpCode, EpisodesApiPath } from '~/common/enums/enums';
import { episode as episodeService } from '~/services/services';
import { handleAsyncApi } from '~/helpers/helpers';
import { validateSchema as validateSchemaMiddleware } from '~/middlewares/middlewares';

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
        .send(await episodeService.getByPodcastId(req.params.id))
        .status(HttpCode.OK);
    }),
  );

  episodeRouter.post(
    EpisodesApiPath.ROOT,
    validateSchemaMiddleware(EpisodeValidationSchema),
    handleAsyncApi(async (req, res) => {
      const episode = await episodeService.create(req.body);
      return res.json(episode).status(HttpCode.CREATED);
    }),
  );

  return episodeRouter;
};

export { initEpisodesApi };

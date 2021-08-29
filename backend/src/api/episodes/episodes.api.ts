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
  checkUserPodcastOwner as checkUserPodcastOwnerMiddleware,
  checkUserEpisodeOwner as checkUserEpisodeOwnerMiddleware,
  checkUserHasPermitToEpisode as checkUserHasPermitToEpisodeMiddleware,
  validateSchema as validateSchemaMiddleware,
} from '~/middlewares/middlewares';
import { EpisodeLoadFilter } from '~/common/types/types';

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
    checkUserHasPermitToEpisodeMiddleware(),
    handleAsyncApi(async (req, res) => {
      return res
        .send(await episodeService.getById(Number(req.params.id)))
        .status(HttpCode.OK);
    }),
  );

  episodeRouter.get(
    EpisodesApiPath.PODCAST_$ID,
    handleAsyncApi(async (req, res) => {
      return res
        .send(await episodeService.getByQueryByPodcastId({
          podcastId: Number(req.params.id),
          filter: req.query as unknown as EpisodeLoadFilter,
        }))
        .status(HttpCode.OK);
    }),
  );

  episodeRouter.post(
    EpisodesApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.POST),
    checkUserPodcastOwnerMiddleware(),
    validateSchemaMiddleware(episodeCreateValidationSchema),
    handleAsyncApi(async (req, res) => {
      const episode = await episodeService.create(req.body);
      return res.json(episode).status(HttpCode.CREATED);
    }),
  );

  episodeRouter.put(
    EpisodesApiPath.$ID,
    checkAuthMiddleware(HttpMethod.PUT),
    checkUserEpisodeOwnerMiddleware(),
    validateSchemaMiddleware(episodeEditValidationSchema),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await episodeService.update(req.params.id, req.body))
        .status(HttpCode.OK);
    }),
  );

  episodeRouter.delete(
    EpisodesApiPath.$ID,
    checkAuthMiddleware(HttpMethod.DELETE),
    checkUserEpisodeOwnerMiddleware(),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await episodeService.delete(Number(req.params.id)))
        .status(HttpCode.OK);
    }),
  );

  return episodeRouter;
};

export { initEpisodesApi };

import { Router } from 'express';
import {
  podcastCreate as podcastCreateValidationSchema,
  podcastEdit as editPodcastValidationSchema,
} from '~/validation-schemas/validation-schemas';
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

  podcastRouter.get(
    PodcastsApiPath.SEARCH_BY_TITLE,
    handleAsyncApi(async (req, res) => {
      return res
        .send(await podcastService.getByTitle(`${req.query.title}`))
        .status(HttpCode.OK);
    }),
  );

  podcastRouter.get(
    PodcastsApiPath.$ID,
    handleAsyncApi(async (req, res) => {
      return res
        .send(await podcastService.getById(req.params.id))
        .status(HttpCode.OK);
    }),
  );

  podcastRouter.post(
    PodcastsApiPath.ROOT,
    validateSchemaMiddleware(podcastCreateValidationSchema),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await podcastService.create(req.body))
        .status(HttpCode.CREATED);
    }),
  );

  podcastRouter.put(
    PodcastsApiPath.$ID,
    validateSchemaMiddleware(editPodcastValidationSchema),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await podcastService.update(req.params.id, req.body))
        .status(HttpCode.OK);
    }),
  );

  return podcastRouter;
};

export { initPodcastsApi };

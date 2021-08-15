import { Router } from 'express';
import { ApiPath, HttpCode, GenresApiPath } from '~/common/enums/enums';
import { genre as genreService } from '~/services/services';
import { handleAsyncApi } from '~/helpers/helpers';

type Args = {
  apiRouter: Router;
  genreService: typeof genreService;
};

const initGenreApi = ({ apiRouter, genreService }: Args): Router => {
  const genreRouter = Router();

  apiRouter.use(ApiPath.GENRES, genreRouter);

  genreRouter.get(
    GenresApiPath.ROOT,
    handleAsyncApi(async (_req, res) => {
      return res.json(await genreService.getAll()).status(HttpCode.OK);
    }),
  );

  return genreRouter;
};

export { initGenreApi };

import { Router } from 'express';
import { ApiPath, HttpCode, RecordsApiPath } from '~/common/enums/enums';
import { record as recordService } from '~/services/services';
import { handleAsyncApi } from '~/helpers/helpers';

type Args = {
  apiRouter: Router;
  recordService: typeof recordService;
};

const initRecordsApi = ({ apiRouter, recordService }: Args): Router => {
  const recordRouter = Router();

  apiRouter.use(ApiPath.RECORDS, recordRouter);

  recordRouter.get(
    RecordsApiPath.ROOT,
    handleAsyncApi(async (_req, res) => {
      return res.json(await recordService.getAll()).status(HttpCode.OK);
    }),
  );

  recordRouter.get(
    RecordsApiPath.EPISODE_$ID,
    handleAsyncApi(async (req, res) => {
      return res
        .json(await recordService.getByEpisodeId(req.params.id))
        .status(HttpCode.OK);
    }),
  );

  return recordRouter;
};

export { initRecordsApi };

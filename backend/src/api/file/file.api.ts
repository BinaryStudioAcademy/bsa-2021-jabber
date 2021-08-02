import { Router } from 'express';
import { ApiPath, HttpCode, FilesApiPath } from '~/common/enums/enums';
import { handleAsyncApi } from '~/helpers/helpers';
import { fileStorage as fileStorageService } from '~/services/services';

type Args = {
  apiRouter: Router;
  fileStorageService: typeof fileStorageService;
};

const initFileApi = ({ apiRouter, fileStorageService }: Args): Router => {
  const fileRouter = Router();

  apiRouter.use(ApiPath.FILES, fileRouter);

  fileRouter.post(
    FilesApiPath.ROOT,
    handleAsyncApi(async (req, res) => {
      return res
        .json(await fileStorageService.upload(req.body))
        .status(HttpCode.CREATED);
    }),
  );

  return fileRouter;
};

export { initFileApi };

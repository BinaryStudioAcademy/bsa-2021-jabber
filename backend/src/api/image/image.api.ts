import { Router } from 'express';
import { ApiPath, HttpCode, ImagesApiPath } from '~/common/enums/enums';
import { handleAsyncApi } from '~/helpers/helpers';
import { fileStorage as fileStorageService } from '~/services/services';

type Args = {
  apiRouter: Router;
  fileStorageService: typeof fileStorageService;
};

const initFileApi = ({ apiRouter, fileStorageService }: Args): Router => {
  const fileRouter = Router();

  apiRouter.use(ApiPath.IMAGES, fileRouter);

  fileRouter.post(
    ImagesApiPath.ROOT,
    handleAsyncApi(async (req, res) => {
      return res
        .json(await fileStorageService.upload(req.body))
        .status(HttpCode.CREATED);
    }),
  );

  return fileRouter;
};

export { initFileApi };

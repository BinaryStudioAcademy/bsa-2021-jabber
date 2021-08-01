import { Router } from 'express';
import { ApiPath, HttpCode, FilesApiPath } from '~/common/enums/enums';
import { handleAsyncApi } from '~/helpers/helpers';
import { uploadFile as uploadFileService } from '~/services/services';

type Args = {
  apiRouter: Router;
  uploadFileService: typeof uploadFileService;
};

const initFileApi = ({ apiRouter, uploadFileService }: Args): Router => {
  const fileRouter = Router();

  apiRouter.use(ApiPath.FILES, fileRouter);

  fileRouter.post(
    FilesApiPath.ROOT,
    handleAsyncApi(async (req, res) => {
      return res
        .json(await uploadFileService.upload(req.body))
        .status(HttpCode.CREATED);
    }),
  );

  return fileRouter;
};

export { initFileApi };

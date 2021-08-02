import { Router } from 'express';
import { image as imageValidationSchema } from '~/validation-schemas/validation-schemas';
import { ApiPath, HttpCode, ImagesApiPath } from '~/common/enums/enums';
import { handleAsyncApi } from '~/helpers/helpers';
import { validateSchema } from '~/middlewares/middlewares';
import {
  fileStorage as fileStorageService,
  image as imageService,
} from '~/services/services';

type Args = {
  apiRouter: Router;
  fileStorageService: typeof fileStorageService;
};

const initFileApi = ({ apiRouter, fileStorageService }: Args): Router => {
  const fileRouter = Router();

  apiRouter.use(ApiPath.IMAGES, fileRouter);

  fileRouter.post(
    ImagesApiPath.ROOT,
    validateSchema(imageValidationSchema),
    handleAsyncApi(async (req, res) => {
      const { url, publicId } = await fileStorageService.upload(req.body);

      return res
        .json(await imageService.create({ url, publicId }))
        .status(HttpCode.CREATED);
    }),
  );

  return fileRouter;
};

export { initFileApi };

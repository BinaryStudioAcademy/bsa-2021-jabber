import { Router } from 'express';
import { ApiPath, HttpCode, CommentsApiPath } from '~/common/enums/enums';
import {
  commentCreate as commentCreateValidationSchema,
} from '~/validation-schemas/validation-schemas';
import { validateSchema as validateSchemaMiddleware } from '~/middlewares/middlewares';
import { comment as commentService } from '~/services/services';
import { handleAsyncApi } from '~/helpers/helpers';

type Args = {
  apiRouter: Router;
  commentService: typeof commentService;
};

const initCommentsApi = ({ apiRouter, commentService }: Args): Router => {
  const commentRouter = Router();

  apiRouter.use(ApiPath.COMMENTS, commentRouter);

  commentRouter.get(
    CommentsApiPath.ROOT,
    handleAsyncApi(async (_req, res) => {
      return res.json(await commentService.getAll()).status(HttpCode.OK);
    }),
  );

  commentRouter.post(
    CommentsApiPath.ROOT,
    validateSchemaMiddleware(commentCreateValidationSchema),
    handleAsyncApi(async (req, res) => {
      return res.json(await commentService.create(req.body)).status(HttpCode.CREATED);
    }),
  );

  commentRouter.get(
    CommentsApiPath.EPISODE_ID,
    handleAsyncApi(async (req, res) => {
      return res
        .json(await commentService.getAllByEpisodeId(Number(req.params.id)))
        .status(HttpCode.OK);
    }),
  );

  return commentRouter;
};

export { initCommentsApi };

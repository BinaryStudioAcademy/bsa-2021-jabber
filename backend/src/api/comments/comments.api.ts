import { Router } from 'express';
import { ApiPath, HttpCode, CommentsApiPath } from '~/common/enums/enums';
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

  return commentRouter;
};

export { initCommentsApi };

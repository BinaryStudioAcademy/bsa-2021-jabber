import { Router } from 'express';
import { ApiPath, HttpCode, CommentReactionsApiPath, HttpMethod } from '~/common/enums/enums';
import {
  checkAuth as checkAuthMiddleware,
} from '~/middlewares/middlewares';
import { commentReaction as commentReactionService } from '~/services/services';
import { handleAsyncApi } from '~/helpers/helpers';

type Args = {
  apiRouter: Router;
  commentReactionService: typeof commentReactionService;
};

const initCommentReactionsApi = ({ apiRouter, commentReactionService }: Args): Router => {
  const commentReactionRouter = Router();

  apiRouter.use(ApiPath.COMMENT_REACTIONS, commentReactionRouter);

  commentReactionRouter.get(
    CommentReactionsApiPath.$COMMENT_ID,
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await commentReactionService.getByCommentId(Number(req.params.commentId)))
        .status(HttpCode.OK);
    }),
  );

  commentReactionRouter.post(
    CommentReactionsApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.POST),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await commentReactionService.create(Number(req.user?.id), Number(req.body.commentId)))
        .status(HttpCode.CREATED);
    }),
  );

  return commentReactionRouter;
};

export { initCommentReactionsApi };

import { RequestHandler } from 'express';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage, HttpCode } from '~/common/enums/enums';
import { comment as commentService } from '~/services/services';

const checkUserCommentOwner = (): RequestHandler => {
  const handler: RequestHandler = async (req, _res, next) => {
    const commentId = req.params.id;
    const { userId: commentOwnerId } = await commentService.getById(Number(commentId));

    if (req.user?.id !== commentOwnerId) {
      next(new HttpError({
        status: HttpCode.UNAUTHORIZED,
        message: ErrorMessage.NOT_YOURS_COMMENT,
      }));
    }

    next();
  };

  return handler;
};

export { checkUserCommentOwner };

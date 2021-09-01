import { RequestHandler } from 'express';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage, HttpCode } from '~/common/enums/enums';

const checkUserMatch = (): RequestHandler => {
  const handler: RequestHandler = async (req, _res, next) => {
    if (req.user?.id !== req.body?.userId) {
      return next(new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: ErrorMessage.BAD_REQUEST,
      }));
    }

    next();
  };

  return handler;
};

export { checkUserMatch };

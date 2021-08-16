import { RequestHandler } from 'express';
import { ErrorMessage, HttpCode } from '~/common/enums/enums';
import { HttpError } from '~/exceptions/exceptions';

const checkUserHasPermitToEdit = (): RequestHandler => {
  const handler: RequestHandler = async (req, _res, next) => {
    const userId = Number(req.params.id);

    if (req.user?.id !== userId) {
      next(
        new HttpError({
          status: HttpCode.UNAUTHORIZED,
          message: ErrorMessage.NO_PERMISSION_TO_EDIT_USER,
        }),
      );
    }

    next();
  };

  return handler;
};

export { checkUserHasPermitToEdit };

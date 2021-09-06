import { RequestHandler } from 'express';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage, HttpCode } from '~/common/enums/enums';

const checkIsParamsValid = (): RequestHandler => {
  const handler: RequestHandler = (req, _res, next) => {

    const params = Object.values(req.params);

    params.forEach((param) => {
      if (isNaN(Number(param))) {
        return next(new HttpError({
          status: HttpCode.BAD_REQUEST,
          message: ErrorMessage.BAD_REQUEST,
        }));
      }
    });

    return next();
  };

  return handler;
};

export { checkIsParamsValid };

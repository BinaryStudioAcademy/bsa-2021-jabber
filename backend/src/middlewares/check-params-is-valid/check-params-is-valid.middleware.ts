import { RequestHandler } from 'express';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage, HttpCode, RouterParams } from '~/common/enums/enums';
import { MAX_POSSIBLE_ID } from '~/common/constants/constants';

const checkParamsIsValid = (...params: RouterParams[]): RequestHandler => {
  const handler: RequestHandler = (req, _res, next) => {

    params.forEach((param) => {
      const checkParam = req.params[param];

      if (checkParam) {
        if (isNaN(Number(checkParam)) || Number(checkParam) > MAX_POSSIBLE_ID) {
          return next(new HttpError({
            status: HttpCode.BAD_REQUEST,
            message: ErrorMessage.BAD_REQUEST,
          }));
        }
      }
    });

    return next();
  };

  return handler;
};

export { checkParamsIsValid };

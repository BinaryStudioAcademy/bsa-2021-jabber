import { RequestHandler } from 'express';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage, HttpCode, RouterParam } from '~/common/enums/enums';
import { MAX_POSSIBLE_ID } from '~/common/constants/constants';

const checkParamsIsValid = (...params: RouterParam[]): RequestHandler => {
  const handler: RequestHandler = (req, _res, next) => {

    params.forEach((param) => {
      const checkParam = req.params[param];
      const isCheckParamIsNaN = checkParam && isNaN(Number(checkParam));
      const isCheckParamImpossible = checkParam && Number(checkParam) > MAX_POSSIBLE_ID;

      if (isCheckParamIsNaN || isCheckParamImpossible) {
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

export { checkParamsIsValid };

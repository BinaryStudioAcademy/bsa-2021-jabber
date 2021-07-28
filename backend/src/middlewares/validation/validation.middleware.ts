import { RequestHandler } from 'express';
import { Schema } from '~/common/types/types';
import { HttpError } from '~/exceptions/exceptions';
import { HttpCode } from '~/common/enums/enums';
import { formatValidationError } from '~/helpers/helpers';

export const validate = (schema: Schema): RequestHandler => {
  const handler: RequestHandler = (req, _res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      const message = formatValidationError(error);

      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: JSON.stringify(message),
      });
    }

    next();
  };

  return handler;
};

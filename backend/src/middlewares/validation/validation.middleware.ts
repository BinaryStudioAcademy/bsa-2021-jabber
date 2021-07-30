import { RequestHandler } from 'express';
import { ValidationSchema } from '~/common/types/types';
import { HttpError } from '~/exceptions/exceptions';
import { HttpCode } from '~/common/enums/enums';
import { formatValidationError } from '~/helpers/helpers';

const validate = (schema: ValidationSchema): RequestHandler => {
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

export { validate }

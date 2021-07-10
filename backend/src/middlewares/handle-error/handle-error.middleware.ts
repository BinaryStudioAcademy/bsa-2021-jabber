import { ErrorRequestHandler } from 'express';
import { logger } from '~/services/services';
import { HttpError } from '~/exceptions/exceptions';
import { HttpCode } from '~/common/enums/enums';

const handleError: ErrorRequestHandler = (err: HttpError, _req, res, _next) => {
  const { status = HttpCode.INTERNAL_SERVER_ERROR, message, stack } = err;

  logger.error(message, stack);

  return res.status(status).send({
    message,
  });
};

export { handleError };

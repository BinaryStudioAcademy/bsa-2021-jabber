import { RequestHandler } from 'express';
import { logger } from '~/services/services';

const logRequest: RequestHandler = async (req, _res, next): Promise<void> => {
  logger.log(`METHOD: ${req.method}, PATH:${req.path}`);

  return next();
};

export { logRequest };

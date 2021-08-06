import { Response, Request, NextFunction } from 'express';
import { jwt as jwtMiddleWare } from '../jwt/jwt.middleware';
import { WhiteRoute } from '~/common/types/types';
import { checkUserAccess } from '~/helpers/helpers';

const authorization = (routesWhiteList: WhiteRoute[] = []) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  checkUserAccess(routesWhiteList, req.path, req.method)
    ? next()
    : jwtMiddleWare(req, res, next);
};

export { authorization };

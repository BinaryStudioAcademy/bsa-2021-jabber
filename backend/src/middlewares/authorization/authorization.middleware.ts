import { Response, Request, NextFunction } from 'express';
import { jwt as jwtMiddleWare } from '../jwt/jwt.middleware';

type WhiteRoute = {
  path: string;
  allowedMethods: string[]
};

const authorization = (routesWhiteList: Array<WhiteRoute>) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  routesWhiteList.some((route) => route.path === req.path &&
    route.allowedMethods.some((method) => method === req.method))
    ? next()
    : jwtMiddleWare(req, res, next);
};
export { authorization };

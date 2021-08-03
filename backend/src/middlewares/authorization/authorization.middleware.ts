import { Response, Request, NextFunction } from 'express';
import { AuthApiPath } from '~/common/enums/enums';
import { jwt as jwtMiddleWare } from '../jwt/jwt.middleware';

const authorization = (routesWhiteList: AuthApiPath[] = []) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  routesWhiteList.some((route) => route === req.path)
    ? next()
    : jwtMiddleWare(req, res, next);
};

export { authorization };

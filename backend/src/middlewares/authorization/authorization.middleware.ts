import { Response, Request, NextFunction } from 'express';
import { jwt as jwtMiddleWare } from '../jwt/jwt.middleware';

const authorization = (routesWhiteList: string[] = []) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  routesWhiteList.some((route) => route === req.path)
    ? next()
    : jwtMiddleWare(req, res, next);
};

export { authorization };

import { Response, Request, NextFunction } from 'express';
import { jwt as jwtMiddleWare } from '../jwt/jwt.middleware';

const authorization = (routesWhiteList: string[] = []) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.log('+++++ROUTES_WHITE_LIST++++++')
  console.log(routesWhiteList)
  console.log(req.path)
  console.log('-----ROUTES_WHITE_LIST------')
  routesWhiteList.some((route) => route === req.path)
    ? next()
    : jwtMiddleWare(req, res, next);
};

export { authorization };

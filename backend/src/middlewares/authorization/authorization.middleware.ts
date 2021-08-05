import { Response, Request, NextFunction } from 'express';
import { jwt as jwtMiddleWare } from '../jwt/jwt.middleware';

const authorization = (routesWhiteList: Map<string, Array<string>>) => (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (routesWhiteList) {
    const availableHttpMethods = routesWhiteList.get(req.path);
    if (availableHttpMethods && availableHttpMethods.some((method) => method === req.method)) {
      next();
      return;
    }
  }

  jwtMiddleWare(req, res, next);
};
export { authorization };

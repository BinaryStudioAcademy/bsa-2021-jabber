import { Response, Request, NextFunction, RequestHandler } from 'express';
import { jwt as jwtMiddleWare } from '../jwt/jwt.middleware';
import { HttpMethod } from '~/common/enums/enums';

const checkAuth = (...methods: HttpMethod[]): RequestHandler => {
  const handler: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
  ): void => {
    methods.some((method) => method === req.method)
      ? jwtMiddleWare(req, res, next)
      : next();
  };

  return handler;
};

export { checkAuth };

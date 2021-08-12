import { Request, Response, NextFunction } from 'express';
import { Server } from 'socket.io';

const injectSocket  = (io: Server) => (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  req.io = io;
  return next();
};

export { injectSocket  };

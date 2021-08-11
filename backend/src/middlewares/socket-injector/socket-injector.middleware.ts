import { Request, Response, NextFunction } from 'express';
import { Server } from 'socket.io';

const socketInjector = (io: Server) => (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  req.io = io;
  next();
};

export { socketInjector };
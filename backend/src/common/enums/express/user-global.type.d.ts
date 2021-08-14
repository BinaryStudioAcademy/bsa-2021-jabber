import { User as TUser } from '~/common/types/types';
import { Server } from 'socket.io';

declare global {
  namespace Express {
    interface User extends TUser { }

    interface Request {
      user?: User;
      io?: Server;
    }
  }
}

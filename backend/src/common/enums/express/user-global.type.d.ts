import { User as TUser } from '~/common/types/types';

declare global {
  namespace Express {
    interface User extends TUser {}

    interface Request {
      user?: User;
    }
  }
}

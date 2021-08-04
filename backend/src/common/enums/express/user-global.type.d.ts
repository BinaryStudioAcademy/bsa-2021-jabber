import { User } from '~/common/types/types';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

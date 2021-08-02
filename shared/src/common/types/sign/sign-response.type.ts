import { User } from '../types';

type SignResponse = {
  token: string;
  user: User;
};

export type { SignResponse };

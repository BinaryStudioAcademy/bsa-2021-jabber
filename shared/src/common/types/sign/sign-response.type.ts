import { User } from '../types';

type SignResponse = {
  token: string;
  user: User | never;
};

export type { SignResponse };

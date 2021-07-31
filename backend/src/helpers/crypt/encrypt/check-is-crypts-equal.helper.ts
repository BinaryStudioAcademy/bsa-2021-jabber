import { compare } from 'bcrypt';

const checkIsCryptsEqual  = (data: string, encrypted: string): Promise<boolean> => {
  return compare(data, encrypted);
};

export { checkIsCryptsEqual  };

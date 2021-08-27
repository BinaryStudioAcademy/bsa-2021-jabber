import { v4 as uuid } from 'uuid';

const getRandomId = (): string => {
  return uuid();
};

export { getRandomId };

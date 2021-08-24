import { v4 as uuid } from 'uuid';

const getUuid = (): string => {
  return uuid();
};

export { getUuid };

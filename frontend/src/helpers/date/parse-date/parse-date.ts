import { parse } from 'date-fns';

const parseDate = (date: string, pattern: string): Date => {
  return parse(date, pattern,  new Date());
};

export { parseDate };

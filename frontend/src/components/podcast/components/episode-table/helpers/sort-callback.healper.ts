import { VALUE_EQUAL, VALUE_GREATER, VALUE_LESS } from 'common/constants/constants';

type ValueType = string | number | Date;

const sortCallback = (a: ValueType, b: ValueType): number => {
  if (a > b) {
    return VALUE_GREATER;
  }
  if (a < b) {
    return VALUE_LESS;
  }
  return VALUE_EQUAL;
};

export { sortCallback };

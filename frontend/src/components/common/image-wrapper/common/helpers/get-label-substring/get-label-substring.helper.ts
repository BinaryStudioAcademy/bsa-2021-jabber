import { FIRST_ARRAY_IDX } from 'common/constants/constants';
import { SYMBOLS_COUNT_IN_LABEL } from '../../constants/constants';

const getLabelSubstring = (label: string): string => {
  return label.substring(FIRST_ARRAY_IDX, SYMBOLS_COUNT_IN_LABEL).toUpperCase();
};

export { getLabelSubstring };

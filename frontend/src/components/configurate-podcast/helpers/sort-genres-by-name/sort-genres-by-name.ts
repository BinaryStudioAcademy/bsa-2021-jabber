import { Option } from 'common/types/types';
import { getSortedItems } from 'helpers/helpers';

const sortGenresByName = (options: Option[]): Option[] => {
  return getSortedItems(options, (a: Option, b:Option) => a.label.localeCompare(b.label));
};

export { sortGenresByName };

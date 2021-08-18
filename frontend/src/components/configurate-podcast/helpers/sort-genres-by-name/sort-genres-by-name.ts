import { Option } from 'common/types/types';

const sortGenresByName = (options: Option[]): Option[] => {
  return [...options].sort((a, b) => a.label.localeCompare(b.label));
};

export { sortGenresByName };

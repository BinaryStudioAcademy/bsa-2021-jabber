import { Option } from 'common/types/types';

const sortGenresByName = (options: Option[]): Option[] => {
  return [...options].sort((a, b) => a.label > b.label ? 1 : -1);
};

export { sortGenresByName };

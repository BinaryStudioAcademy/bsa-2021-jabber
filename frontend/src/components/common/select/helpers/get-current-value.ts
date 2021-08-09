import { Option } from 'common/types/types';

const getCurrentValue = (options: Option[], value: string): Option | null => {
  return options.find((it) => it.value === value) ?? null;
};

export { getCurrentValue };

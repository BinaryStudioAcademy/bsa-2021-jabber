import { ShownoteRecord } from 'common/types/types';

const sortShownotes = (shownotes: ShownoteRecord[]): ShownoteRecord[] => {
  return [...shownotes].sort((s1, s2) => s1.timestamp - s2.timestamp);
};

export { sortShownotes };

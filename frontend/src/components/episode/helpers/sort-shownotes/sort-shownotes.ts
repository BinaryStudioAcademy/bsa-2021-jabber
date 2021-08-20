import { Shownote } from 'common/types/types';

const getSortedShownotes = ( shownotes: Shownote[]): Shownote[] => {
  return [...shownotes].sort((a, b) => a.timestamp - b.timestamp);
};

export { getSortedShownotes };

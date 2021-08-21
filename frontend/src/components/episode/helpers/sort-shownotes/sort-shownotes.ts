import { Shownote } from 'common/types/types';
import { getSortedItems } from 'helpers/helpers';

const getSortedShownotes = ( shownotes: Shownote[]): Shownote[] => {
  return getSortedItems(shownotes, (a: Shownote, b: Shownote) => a.timestamp - b.timestamp);
};

export { getSortedShownotes };

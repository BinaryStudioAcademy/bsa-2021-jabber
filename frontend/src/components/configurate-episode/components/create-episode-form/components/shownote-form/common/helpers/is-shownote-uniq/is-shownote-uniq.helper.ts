import { ShownoteCreatePayload, ShownotePayload } from 'common/types/types';
import { getTimestamp } from '../get-timestamp/get-timestamp.helper';

const isShownoteUniq = (
  shownote: ShownoteCreatePayload,
  shownotes: ShownotePayload[],
): boolean => {
  const timestamp = getTimestamp(
    Number(shownote.minutes),
    Number(shownote.seconds),
  );

  return !shownotes.some((shownote) => shownote.timestamp === timestamp);
};

export { isShownoteUniq };

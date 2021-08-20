import { ShownoteFormPayload, ShownotePayload } from 'common/types/types';
import { getTimestamp } from 'helpers/date/date';

const mapToShownotePayload = ({
  name,
  minutes,
  seconds,
}: ShownoteFormPayload): ShownotePayload => ({
  name,
  timestamp: getTimestamp(Number(minutes), Number(seconds)),
});

export { mapToShownotePayload };

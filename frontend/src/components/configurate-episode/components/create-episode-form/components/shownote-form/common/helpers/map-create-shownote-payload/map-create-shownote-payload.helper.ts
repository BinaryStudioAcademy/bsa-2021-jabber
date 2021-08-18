import { ShownoteCreatePayload, ShownotePayload } from 'common/types/types';
import { getTimestamp } from '../get-timestamp/get-timestamp.helper';

const mapCreateShownotePayload = ({
  minutes,
  seconds,
  name,
}: ShownoteCreatePayload): ShownotePayload => ({
  name: name,
  timestamp: getTimestamp(Number(minutes), Number(seconds)),
});

export { mapCreateShownotePayload };

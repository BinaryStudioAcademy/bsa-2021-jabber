import { SECONDS_IN_MINUTE } from 'common/constants/constants';
import { ShownoteFormPayload, ShownotePayload } from 'common/types/types';

const mapShownoteToFormPayload = ({
  name,
  timestamp,
}: ShownotePayload): ShownoteFormPayload => {
  const minutes = Math.floor(timestamp / SECONDS_IN_MINUTE);
  const seconds = timestamp - minutes * SECONDS_IN_MINUTE;

  return { name, minutes, seconds };
};

export { mapShownoteToFormPayload };

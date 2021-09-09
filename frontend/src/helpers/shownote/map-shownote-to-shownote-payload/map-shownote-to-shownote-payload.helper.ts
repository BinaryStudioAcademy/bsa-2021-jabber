import { Shownote, ShownotePayload } from 'common/types/types';

const mapShownoteToShownotePayload = ({
  name,
  timestamp,
}: Shownote): ShownotePayload => ({
  name,
  timestamp,
});

export { mapShownoteToShownotePayload };

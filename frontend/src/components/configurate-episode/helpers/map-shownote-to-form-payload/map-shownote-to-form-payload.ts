import { Shownote, ShownotePayload } from 'common/types/types';

const mapShownoteToFormPayload = (shownote: Shownote): ShownotePayload => ({
  name: shownote.name,
  timestamp: shownote.timestamp,
});

export { mapShownoteToFormPayload };

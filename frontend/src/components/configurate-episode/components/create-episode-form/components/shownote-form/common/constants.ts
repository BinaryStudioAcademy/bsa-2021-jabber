import { ShownotePayloadKey } from 'common/enums/enums';
import { ShownoteCreatePayload } from 'common/types/types';

const SHOWNOTES_UNIQ_ERROR = 'shownotesUniqError';
const SHOWNOTES_UNIQ_ERROR_MESSAGE = 'Shownote contains a duplicate value';

const DEFAULT_INPUT_SHOWNOTE_PAYLOAD: ShownoteCreatePayload = {
  [ShownotePayloadKey.MINUTES]: '',
  [ShownotePayloadKey.SECONDS]: '',
  [ShownotePayloadKey.NAME]: '',
};

export {
  DEFAULT_INPUT_SHOWNOTE_PAYLOAD,
  SHOWNOTES_UNIQ_ERROR,
  SHOWNOTES_UNIQ_ERROR_MESSAGE,
};

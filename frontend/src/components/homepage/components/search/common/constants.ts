import { SearchPayloadKey } from './enums/search';
import { SearchPayload } from './types/search';

const DEFAULT_SEARCH_PAYLOAD: SearchPayload = {
  [SearchPayloadKey.SEARCH]: '',
};

export { DEFAULT_SEARCH_PAYLOAD };

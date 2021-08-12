import { SearchPayloadKey } from './enums/search';
import { SearchPayload } from './types/search';

const DEFAULT_SEARCH_PAYLOAD: SearchPayload = {
  [SearchPayloadKey.SEARCH]: '',
};

export const SEARCH_TIMEOUT = 1000;

export { DEFAULT_SEARCH_PAYLOAD };

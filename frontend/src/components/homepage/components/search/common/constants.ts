import { PodcastSearchPayloadKey } from './enums/search';
import { PodcastSearchPayload } from './types/search';

const DEFAULT_PODCAST_SEARCH_PAYLOAD: PodcastSearchPayload = {
  [PodcastSearchPayloadKey.PODCAST_SEARCH]: '',
};

const SEARCH_TIMEOUT = 1000;

export { DEFAULT_PODCAST_SEARCH_PAYLOAD, SEARCH_TIMEOUT };

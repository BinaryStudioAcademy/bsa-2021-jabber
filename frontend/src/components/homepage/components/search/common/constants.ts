import { PodcastSearchPayload } from 'common/types/types';
import { PodcastSearchPayloadKey } from 'common/enums/enums';

const DEFAULT_PODCAST_SEARCH_PAYLOAD: PodcastSearchPayload = {
  [PodcastSearchPayloadKey.SEARCH]: '',
};

export { DEFAULT_PODCAST_SEARCH_PAYLOAD };

import { PodcastSearchPayloadKey } from '../enums/search';

type PodcastSearchPayload = {
  [PodcastSearchPayloadKey.PODCAST_SEARCH]: string,
};

export type { PodcastSearchPayload };

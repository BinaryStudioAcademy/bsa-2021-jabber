import { PodcastSearchPayloadKey } from 'common/enums/enums';

type PodcastSearchPayload = {
  [PodcastSearchPayloadKey.PODCAST_SEARCH]: string,
};

export type { PodcastSearchPayload };

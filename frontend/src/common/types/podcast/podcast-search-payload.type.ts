import { PodcastSearchPayloadKey } from 'common/enums/enums';

type PodcastSearchPayload = {
  [PodcastSearchPayloadKey.SEARCH]: string,
};

export type { PodcastSearchPayload };

import { PodcastPayloadKey } from 'common/enums/enums';
import { PodcastFormPayload } from 'common/types/types';

const DEFAULT_PODCAST_PAYLOAD: PodcastFormPayload = {
  [PodcastPayloadKey.NAME]: '',
  [PodcastPayloadKey.DESCRIPTION]: '',
  [PodcastPayloadKey.IMAGE]: null,
};

export { DEFAULT_PODCAST_PAYLOAD };

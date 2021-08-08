import { PodcastPayloadKey, PodcastType } from 'common/enums/enums';
import { PodcastFormPayload } from 'common/types/types';

const DEFAULT_PODCAST_PAYLOAD: PodcastFormPayload = {
  [PodcastPayloadKey.NAME]: '',
  [PodcastPayloadKey.DESCRIPTION]: '',
  [PodcastPayloadKey.IMAGE]: null,
  [PodcastPayloadKey.TYPE]: PodcastType.PUBLIC,
};

export { DEFAULT_PODCAST_PAYLOAD };

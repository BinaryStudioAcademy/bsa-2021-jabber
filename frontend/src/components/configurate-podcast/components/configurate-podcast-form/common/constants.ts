import { PodcastPayloadKey, PodcastType } from 'common/enums/enums';
import { PodcastFormPayload } from 'common/types/types';

const DEFAULT_PODCAST_PAYLOAD: PodcastFormPayload = {
  [PodcastPayloadKey.NAME]: '',
  [PodcastPayloadKey.DESCRIPTION]: '',
  [PodcastPayloadKey.IMAGE]: null,
  [PodcastPayloadKey.COVER]: null,
  [PodcastPayloadKey.TYPE]: PodcastType.PUBLIC,
  [PodcastPayloadKey.GENRE]: null,
};

export { DEFAULT_PODCAST_PAYLOAD };

import { PodcastPayloadKey, PodcastType, PodcastPeriodicity } from 'common/enums/enums';
import { PodcastFormPayload } from 'common/types/types';

const DEFAULT_PODCAST_PAYLOAD: PodcastFormPayload = {
  [PodcastPayloadKey.NAME]: '',
  [PodcastPayloadKey.DESCRIPTION]: '',
  [PodcastPayloadKey.IMAGE]: null,
  [PodcastPayloadKey.COVER]: null,
  [PodcastPayloadKey.TYPE]: PodcastType.PUBLIC,
  [PodcastPayloadKey.GENRE]: '',
  [PodcastPayloadKey.PERIODICITY]: PodcastPeriodicity.WEEKLY,
};

export { DEFAULT_PODCAST_PAYLOAD };

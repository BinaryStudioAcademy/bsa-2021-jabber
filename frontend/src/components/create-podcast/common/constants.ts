import { PodcastCreatePayloadKey } from 'common/enums/enums';
import { PodcastCreatePayload } from 'common/types/types';

const DEFAULT_PODCAST_PAYLOAD: PodcastCreatePayload = {
  [PodcastCreatePayloadKey.NAME]: '',
  [PodcastCreatePayloadKey.USER_ID]: '1',
};

export { DEFAULT_PODCAST_PAYLOAD };

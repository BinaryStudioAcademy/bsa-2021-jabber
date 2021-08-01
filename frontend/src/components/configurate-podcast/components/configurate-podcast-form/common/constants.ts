import { PodcastCreatePayloadKey } from 'common/enums/enums';
import { PodcastCreatePayload } from 'common/types/types';
import { DEFAULT_USER_ID } from 'common/constants/constants';

const DEFAULT_PODCAST_PAYLOAD: PodcastCreatePayload = {
  [PodcastCreatePayloadKey.NAME]: '',
  [PodcastCreatePayloadKey.USER_ID]: DEFAULT_USER_ID,
};

export { DEFAULT_PODCAST_PAYLOAD };

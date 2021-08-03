import { PodcastCreatePayloadKey } from 'common/enums/enums';
import { PodcastCreatePayload } from 'common/types/types';
import { DEFAULT_USER_ID } from 'common/constants/constants';

const DEFAULT_PODCAST_PAYLOAD: PodcastCreatePayload = {
  [PodcastCreatePayloadKey.NAME]: '',
  [PodcastCreatePayloadKey.DESCRIPTION]: '',
  [PodcastCreatePayloadKey.USER_ID]: DEFAULT_USER_ID,
  [PodcastCreatePayloadKey.DESCRIPTION]: '',
  [PodcastCreatePayloadKey.IMG_DATA_URL]: '',
};

export { DEFAULT_PODCAST_PAYLOAD };

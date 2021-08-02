import { EpisodeCreatePayloadKey } from 'common/enums/enums';
import { EpisodeCreatePayload } from 'common/types/types';
import { DEFAULT_USER_ID, DEFAULT_PODCAST_ID } from 'common/constants/constants';

const DEFAULT_CREATE_EPISODE_PAYLOAD: EpisodeCreatePayload = {
  [EpisodeCreatePayloadKey.NAME]: '',
  [EpisodeCreatePayloadKey.USER_ID]: DEFAULT_USER_ID,
  [EpisodeCreatePayloadKey.PODCAST_ID]: DEFAULT_PODCAST_ID,
};

export { DEFAULT_CREATE_EPISODE_PAYLOAD };

import { EpisodeCreatePayloadKey, EpisodeType } from 'common/enums/enums';
import { EpisodeCreatePayload } from 'common/types/types';
import { DEFAULT_USER_ID, DEFAULT_PODCAST_ID } from 'common/constants/constants';

const DEFAULT_CREATE_EPISODE_PAYLOAD: EpisodeCreatePayload = {
  [EpisodeCreatePayloadKey.NAME]: '',
  [EpisodeCreatePayloadKey.DESCRIPTION]: '',
  [EpisodeCreatePayloadKey.USER_ID]: DEFAULT_USER_ID,
  [EpisodeCreatePayloadKey.PODCAST_ID]: DEFAULT_PODCAST_ID,
  [EpisodeCreatePayloadKey.TYPE]: EpisodeType.PUBLIC,
};

export { DEFAULT_CREATE_EPISODE_PAYLOAD };

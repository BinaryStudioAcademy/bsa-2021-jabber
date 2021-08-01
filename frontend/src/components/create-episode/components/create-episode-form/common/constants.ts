import { EpisodeCreatePayloadKey } from 'common/enums/enums';
import { EpisodeCreatePayload } from 'common/types/types';

const DEFAULT_CREATE_EPISODE_PAYLOAD: EpisodeCreatePayload = {
  [EpisodeCreatePayloadKey.NAME]: '',
};

export { DEFAULT_CREATE_EPISODE_PAYLOAD };

import { EpisodePayloadKey, EpisodeType } from 'common/enums/enums';
import { EpisodeFormPayload } from 'common/types/types';

const DEFAULT_CREATE_EPISODE_PAYLOAD: EpisodeFormPayload = {
  [EpisodePayloadKey.NAME]: '',
  [EpisodePayloadKey.DESCRIPTION]: '',
  [EpisodePayloadKey.TYPE]: EpisodeType.PUBLIC,
  [EpisodePayloadKey.RECORD]: null,
};

export { DEFAULT_CREATE_EPISODE_PAYLOAD };

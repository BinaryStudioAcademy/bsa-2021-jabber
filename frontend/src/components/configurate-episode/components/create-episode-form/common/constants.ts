import {
  EpisodePayloadKey,
  EpisodeType,
  ShownotePayloadKey,
  EpisodeStatus,
} from 'common/enums/enums';
import { EpisodeFormPayload, ShownoteFormPayload } from 'common/types/types';

const DEFAULT_CREATE_EPISODE_PAYLOAD: EpisodeFormPayload = {
  [EpisodePayloadKey.NAME]: '',
  [EpisodePayloadKey.DESCRIPTION]: '',
  [EpisodePayloadKey.SHOWNOTES]: [],
  [EpisodePayloadKey.TYPE]: EpisodeType.PUBLIC,
  [EpisodePayloadKey.IMAGE]: null,
  [EpisodePayloadKey.RECORD]: null,
  [EpisodePayloadKey.STATUS]: EpisodeStatus.STAGING,
  [EpisodePayloadKey.RECORD_DATA_URL]: null,
};

const DEFAULT_SHOWNOTE_PAYLOAD: ShownoteFormPayload = {
  [ShownotePayloadKey.NAME]: '',
  [ShownotePayloadKey.MINUTES]: '',
  [ShownotePayloadKey.SECONDS]: '',
};

export { DEFAULT_CREATE_EPISODE_PAYLOAD, DEFAULT_SHOWNOTE_PAYLOAD };

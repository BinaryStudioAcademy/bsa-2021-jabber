import {
  EpisodePayloadKey,
  EpisodeType,
  ShownotePayloadKey,
  EpisodeStatus,
} from 'common/enums/enums';
import { EpisodeFormPayload, ShownotePayload } from 'common/types/types';

const DEFAULT_CREATE_EPISODE_PAYLOAD: EpisodeFormPayload = {
  [EpisodePayloadKey.NAME]: '',
  [EpisodePayloadKey.DESCRIPTION]: '',
  [EpisodePayloadKey.SHOWNOTES]: [],
  [EpisodePayloadKey.TYPE]: EpisodeType.PUBLIC,
  [EpisodePayloadKey.IMAGE]: null,
  [EpisodePayloadKey.RECORD]: null,
  [EpisodePayloadKey.STATUS]: EpisodeStatus.PUBLISHED,
  [EpisodePayloadKey.PODCAST_ID]: -1,
};

const DEFAULT_SHOWNOTE_PAYLOAD: ShownotePayload = {
  [ShownotePayloadKey.NAME]: '',
  [ShownotePayloadKey.TIMESTAMP]: 0,
};

export { DEFAULT_CREATE_EPISODE_PAYLOAD, DEFAULT_SHOWNOTE_PAYLOAD };

import { EpisodeCreatePayload, ShownotePayload } from 'common/types/types';
import {
  EpisodeCreatePayloadKey,
  EpisodeType,
  ShownotePayloadKey,
} from 'common/enums/enums';
import {
  DEFAULT_USER_ID,
  DEFAULT_PODCAST_ID,
} from 'common/constants/constants';

const DEFAULT_CREATE_EPISODE_PAYLOAD: EpisodeCreatePayload = {
  [EpisodeCreatePayloadKey.NAME]: '',
  [EpisodeCreatePayloadKey.DESCRIPTION]: '',
  [EpisodeCreatePayloadKey.SHOWNOTES]: [],
  [EpisodeCreatePayloadKey.USER_ID]: DEFAULT_USER_ID,
  [EpisodeCreatePayloadKey.PODCAST_ID]: DEFAULT_PODCAST_ID,
  [EpisodeCreatePayloadKey.TYPE]: EpisodeType.PUBLIC,
};

const DEFAULT_SHOWNOTE_PAYLOAD: ShownotePayload = {
  [ShownotePayloadKey.NAME]: '',
  [ShownotePayloadKey.TIMESTAMP]: 0,
};

export { DEFAULT_CREATE_EPISODE_PAYLOAD, DEFAULT_SHOWNOTE_PAYLOAD };

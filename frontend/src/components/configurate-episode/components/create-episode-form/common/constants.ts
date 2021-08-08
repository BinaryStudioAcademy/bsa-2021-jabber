import { EpisodeCreatePayloadKey, EpisodeType } from 'common/enums/enums';
import { EpisodeCreatePayload } from 'common/types/types';
import {
  DEFAULT_USER_ID,
  DEFAULT_PODCAST_ID,
  DEFAULT_EPISODE_ID,
} from 'common/constants/constants';
import { ShownoteCreatePayload } from 'jabber-shared/common/types/types';
import { ShownoteCreatePayloadKey } from 'jabber-shared/common/enums/enums';

const DEFAULT_CREATE_EPISODE_PAYLOAD: EpisodeCreatePayload = {
  [EpisodeCreatePayloadKey.NAME]: '',
  [EpisodeCreatePayloadKey.DESCRIPTION]: '',
  [EpisodeCreatePayloadKey.SHOWNOTES]: [],
  [EpisodeCreatePayloadKey.USER_ID]: DEFAULT_USER_ID,
  [EpisodeCreatePayloadKey.PODCAST_ID]: DEFAULT_PODCAST_ID,
  [EpisodeCreatePayloadKey.TYPE]: EpisodeType.PUBLIC,
};

const DEFAULT_CREATE_SHOWNOTE_PAYLOAD: ShownoteCreatePayload = {
  [ShownoteCreatePayloadKey.NAME]: '',
  [ShownoteCreatePayloadKey.EPISODE_ID]: DEFAULT_EPISODE_ID,
  [ShownoteCreatePayloadKey.TIMESTAMP]: 0,
};

export { DEFAULT_CREATE_EPISODE_PAYLOAD, DEFAULT_CREATE_SHOWNOTE_PAYLOAD };

import { EpisodePayloadKey } from 'common/enums/enums';
import { EpisodePayload } from 'jabber-shared/common/types/types';
import { ShownoteFormPayload } from '../types';

type EpisodeFormPayload = EpisodePayload & {
  [EpisodePayloadKey.IMAGE]: FileList | null;
  [EpisodePayloadKey.RECORD]: FileList | null;
  [EpisodePayloadKey.SHOWNOTES]: ShownoteFormPayload[];
  [EpisodePayloadKey.RECORD_DATA_URL]: string | null;
};

export type { EpisodeFormPayload };

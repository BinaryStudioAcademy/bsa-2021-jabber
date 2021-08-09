import { EpisodePayloadKey } from 'common/enums/enums';
import {
  EpisodePayload,
  ShownotePayload,
} from 'jabber-shared/common/types/types';

type EpisodeFormPayload = EpisodePayload & {
  [EpisodePayloadKey.RECORD]: FileList | null;
  [EpisodePayloadKey.SHOWNOTES]: ShownotePayload[];
};

export type { EpisodeFormPayload };

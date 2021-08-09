import { EpisodePayloadKey } from 'common/enums/enums';
import { EpisodePayload } from 'jabber-shared/common/types/types';

type EpisodeFormPayload = EpisodePayload & {
  [EpisodePayloadKey.RECORD]: FileList | null;
};

export type { EpisodeFormPayload };

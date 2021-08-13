import { PodcastPayloadKey } from 'common/enums/enums';
import { PodcastPayload } from 'jabber-shared/common/types/types';

type PodcastFormPayload = PodcastPayload & {
  [PodcastPayloadKey.IMAGE]: FileList | null;
  [PodcastPayloadKey.COVER]: FileList | null;
};

export type { PodcastFormPayload };

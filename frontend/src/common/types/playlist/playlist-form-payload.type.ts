import { PlaylistPayloadKey } from 'common/enums/enums';
import { PlaylistPayload } from 'jabber-shared/common/types/types';

type PlaylistFormPayload = PlaylistPayload & {
  [PlaylistPayloadKey.COVER]: FileList | null;
};

export type { PlaylistFormPayload };

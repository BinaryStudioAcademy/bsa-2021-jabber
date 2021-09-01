import { PlaylistPayloadKey } from 'common/enums/enums';
import { PlaylistFormPayload } from 'common/types/types';

const DEFAULT_PLAYLIST_PAYLOAD: PlaylistFormPayload = {
  [PlaylistPayloadKey.NAME]: '',
};

export { DEFAULT_PLAYLIST_PAYLOAD };

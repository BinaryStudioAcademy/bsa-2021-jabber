import { PlaylistPayloadKey, PlaylistStatus } from 'common/enums/enums';
import { PlaylistFormPayload } from 'common/types/types';

const DEFAULT_PLAYLIST_PAYLOAD: PlaylistFormPayload = {
  [PlaylistPayloadKey.NAME]: '',
  [PlaylistPayloadKey.DESCRIPTION]: '',
  [PlaylistPayloadKey.STATUS]: PlaylistStatus.STAGING,
  [PlaylistPayloadKey.COVER]: null,
};

export { DEFAULT_PLAYLIST_PAYLOAD };

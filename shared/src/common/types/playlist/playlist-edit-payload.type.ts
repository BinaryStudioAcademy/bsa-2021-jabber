import { PlaylistPayloadKey } from '~/common/enums/enums';
import { PlaylistPayload } from '~/common/types/types';

type PlaylistEditPayload = PlaylistPayload & {
  [PlaylistPayloadKey.COVER_DATA_URL]: string | null;
  [PlaylistPayloadKey.USER_ID]: number;
  [PlaylistPayloadKey.COVER_ID]: number | null;
};

export type { PlaylistEditPayload };

import { PlaylistPayloadKey } from '~/common/enums/enums';
import { PlaylistPayload } from '~/common/types/types';

type PlaylistCreatePayload = PlaylistPayload & {
  [PlaylistPayloadKey.COVER_DATA_URL]: string | null;
  [PlaylistPayloadKey.USER_ID]: number;
};

export type { PlaylistCreatePayload };

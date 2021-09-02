import { PlaylistPayloadKey } from '~/common/enums/enums';

type PlaylistPayload = {
  [PlaylistPayloadKey.USER_ID]: number;
  [PlaylistPayloadKey.NAME]: string;
};

export type { PlaylistPayload };

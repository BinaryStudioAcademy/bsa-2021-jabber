import { PlaylistPayloadKey } from 'common/enums/enums';

type PlaylistFormPayload = {
  [PlaylistPayloadKey.NAME]: string;
};

export type { PlaylistFormPayload };

import { PlaylistPayloadKey, PlaylistStatus } from '~/common/enums/enums';

type PlaylistPayload = {
  [PlaylistPayloadKey.NAME]: string;
  [PlaylistPayloadKey.DESCRIPTION]: string;
  [PlaylistPayloadKey.STATUS]: PlaylistStatus;
};

export type { PlaylistPayload };

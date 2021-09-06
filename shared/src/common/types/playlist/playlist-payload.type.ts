import {PlaylistPayloadKey, PlaylistStatus } from '~/common/enums/enums';

type PlaylistPayload = {
  [PlaylistPayloadKey.NAME]: string;
  [PlaylistPayloadKey.DESCRIPTION]: string;
  [PlaylistPayloadKey.STATUS]: PlaylistStatus;
  [PlaylistPayloadKey.INVITATION_CODE]: string;
};

export type { PlaylistPayload };

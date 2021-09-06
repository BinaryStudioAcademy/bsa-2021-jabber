import { PlaylistInvitationCodePayloadKey } from '~/common/enums/enums';

type PlaylistInvitationCodePayload = {
  [PlaylistInvitationCodePayloadKey.PLAYLIST_ID]: number;
  [PlaylistInvitationCodePayloadKey.CODE]: string;
};

export type { PlaylistInvitationCodePayload };

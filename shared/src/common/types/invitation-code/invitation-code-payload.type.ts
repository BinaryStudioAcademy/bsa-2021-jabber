import { InvitationCodePayloadKey } from '~/common/enums/enums';

type InvitationCodePayload = {
  [InvitationCodePayloadKey.PODCAST_ID]: number;
  [InvitationCodePayloadKey.CODE]: string;
};

export type { InvitationCodePayload };

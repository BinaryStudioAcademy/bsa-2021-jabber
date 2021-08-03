import { PodcastEditPayloadKey } from '~/common/enums/enums';

type PodcastEditPayload = {
  [PodcastEditPayloadKey.NAME]: string;
  [PodcastEditPayloadKey.USER_ID]: number;
  [PodcastEditPayloadKey.DESCRIPTION]: string;
};

export type { PodcastEditPayload };

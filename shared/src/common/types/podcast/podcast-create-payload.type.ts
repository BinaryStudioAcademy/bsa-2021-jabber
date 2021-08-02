import { PodcastCreatePayloadKey } from '~/common/enums/enums';

type PodcastCreatePayload = {
  [PodcastCreatePayloadKey.NAME]: string;
  [PodcastCreatePayloadKey.USER_ID]: number;
  [PodcastCreatePayloadKey.DESCRIPTION]: string;
};

export type { PodcastCreatePayload };

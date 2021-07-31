import { PodcastCreatePayloadKey } from '~/common/enums/enums';

type PodcastCreatePayload = {
  [PodcastCreatePayloadKey.NAME]: string;
  [PodcastCreatePayloadKey.USER_ID]: number;
};

export type { PodcastCreatePayload };

import { PodcastCreatePayloadKey } from '~/common/enums/enums';

type PodcastCreatePayload = {
  [PodcastCreatePayloadKey.NAME]: string;
  [PodcastCreatePayloadKey.USER_ID]: number;
  [PodcastCreatePayloadKey.DESCRIPTION]: string;
  [PodcastCreatePayloadKey.IMG_DATA_URL]: string;
};

export type { PodcastCreatePayload };

import { PodcastPayloadKey } from '~/common/enums/enums';
import { PodcastPayload } from './podcast-payload.type';

type PodcastCreatePayload = PodcastPayload & {
  [PodcastPayloadKey.IMAGE_DATA_URL]: string | null;
  [PodcastPayloadKey.USER_ID]: number;
};

export type { PodcastCreatePayload };

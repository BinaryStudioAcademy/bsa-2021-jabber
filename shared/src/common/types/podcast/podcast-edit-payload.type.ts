import { PodcastPayload } from './podcast';
import { PodcastPayloadKey } from '~/common/enums/enums';

type PodcastEditPayload = PodcastPayload & {
  [PodcastPayloadKey.USER_ID]: number;
  [PodcastPayloadKey.IMAGE_DATA_URL]: string | null;
  [PodcastPayloadKey.IMAGE_ID]: number | null;
};

export type { PodcastEditPayload };

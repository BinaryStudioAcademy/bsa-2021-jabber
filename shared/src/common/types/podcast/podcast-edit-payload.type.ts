import { PodcastPayload } from './podcast';
import { PodcastPayloadKey } from '~/common/enums/enums';

type PodcastEditPayload = PodcastPayload & {
  [PodcastPayloadKey.USER_ID]: number;
  [PodcastPayloadKey.IMAGE_DATA_URL]: string | null;
  [PodcastPayloadKey.IMAGE_ID]: number | null;
  [PodcastPayloadKey.COVER_DATA_URL]: string | null;
  [PodcastPayloadKey.COVER_ID]: number | null;
  [PodcastPayloadKey.GENRE_ID]: number;
};

export type { PodcastEditPayload };

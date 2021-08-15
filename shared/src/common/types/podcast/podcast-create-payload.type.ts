import { PodcastPayloadKey } from '~/common/enums/enums';
import { PodcastPayload } from './podcast-payload.type';

type PodcastCreatePayload = PodcastPayload & {
  [PodcastPayloadKey.COVER_DATA_URL]: string | null;
  [PodcastPayloadKey.IMAGE_DATA_URL]: string | null;
  [PodcastPayloadKey.USER_ID]: number;
  [PodcastPayloadKey.GENRE_ID]: number | null;
};

export type { PodcastCreatePayload };

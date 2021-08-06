import { Podcast } from './podcast.type';
import { PodcastPayloadKey } from '~/common/enums/enums';

type PodcastEditPayload = Podcast & {
  [PodcastPayloadKey.IMAGE_DATA_URL]: string | null;
};

export type { PodcastEditPayload };

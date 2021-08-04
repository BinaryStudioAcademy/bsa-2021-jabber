import { PodcastPayloadKey } from '~/common/enums/enums';

type PodcastPayload = {
  [PodcastPayloadKey.NAME]: string;
  [PodcastPayloadKey.DESCRIPTION]: string;
};

export type { PodcastPayload };

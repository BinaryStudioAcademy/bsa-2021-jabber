import { PodcastPayloadKey, PodcastType } from '~/common/enums/enums';

type PodcastPayload = {
  [PodcastPayloadKey.NAME]: string;
  [PodcastPayloadKey.DESCRIPTION]: string;
  [PodcastPayloadKey.TYPE]: PodcastType;
};

export type { PodcastPayload };

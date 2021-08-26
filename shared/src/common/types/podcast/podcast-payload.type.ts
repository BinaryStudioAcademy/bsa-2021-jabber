import { PodcastPayloadKey, PodcastPeriodicity, PodcastType } from '~/common/enums/enums';

type PodcastPayload = {
  [PodcastPayloadKey.NAME]: string;
  [PodcastPayloadKey.DESCRIPTION]: string;
  [PodcastPayloadKey.TYPE]: PodcastType;
  [PodcastPayloadKey.PERIODICITY]: PodcastPeriodicity;
  [PodcastPayloadKey.INVITATION_CODE]: string;
};

export type { PodcastPayload };

import { EpisodeCreatePayloadKey, EpisodeType, EpisodeStatus } from '~/common/enums/enums';

type EpisodeCreatePayload = {
  [EpisodeCreatePayloadKey.NAME]: string;
  [EpisodeCreatePayloadKey.USER_ID]: number;
  [EpisodeCreatePayloadKey.PODCAST_ID]: number;
  [EpisodeCreatePayloadKey.TYPE]: EpisodeType;
  [EpisodeCreatePayloadKey.DESCRIPTION]: string;
  [EpisodeCreatePayloadKey.STATUS]: EpisodeStatus;
};

export type { EpisodeCreatePayload };

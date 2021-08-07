import { EpisodeCreatePayloadKey, EpisodeType } from '~/common/enums/enums';

type EpisodePayload = {
  [EpisodeCreatePayloadKey.NAME]: string;
  [EpisodeCreatePayloadKey.TYPE]: EpisodeType;
  [EpisodeCreatePayloadKey.DESCRIPTION]: string;
};

export type { EpisodePayload };

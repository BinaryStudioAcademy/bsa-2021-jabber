import { EpisodeType, EpisodePayloadKey } from '~/common/enums/enums';

type EpisodePayload = {
  [EpisodePayloadKey.NAME]: string;
  [EpisodePayloadKey.DESCRIPTION]: string;
  [EpisodePayloadKey.TYPE]: EpisodeType;
};

export type { EpisodePayload };

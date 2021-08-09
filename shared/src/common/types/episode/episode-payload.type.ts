import { EpisodePayloadKey, EpisodeType } from '~/common/enums/enums';

type EpisodePayload = {
  [EpisodePayloadKey.NAME]: string;
  [EpisodePayloadKey.TYPE]: EpisodeType;
  [EpisodePayloadKey.DESCRIPTION]: string;
};

export type { EpisodePayload };

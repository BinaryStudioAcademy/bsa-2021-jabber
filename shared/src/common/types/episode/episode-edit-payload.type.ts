import { EpisodePayloadKey, EpisodeType } from '~/common/enums/enums';

type EpisodeEditPayload = {
  [EpisodePayloadKey.NAME]: string;
  [EpisodePayloadKey.DESCRIPTION]: string;
  [EpisodePayloadKey.TYPE]: EpisodeType;
};

export type { EpisodeEditPayload };

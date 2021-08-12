import { EpisodePayloadKey, EpisodeStatus, EpisodeType } from '~/common/enums/enums';

type EpisodePayload = {
  [EpisodePayloadKey.NAME]: string;
  [EpisodePayloadKey.TYPE]: EpisodeType;
  [EpisodePayloadKey.DESCRIPTION]: string;
  [EpisodePayloadKey.STATUS]: EpisodeStatus;
};

export type { EpisodePayload };

import {EpisodeCreatePayloadKey, EpisodePayloadKey, EpisodeStatus, EpisodeType} from '~/common/enums/enums';

type EpisodePayload = {
  [EpisodePayloadKey.NAME]: string;
  [EpisodePayloadKey.TYPE]: EpisodeType;
  [EpisodePayloadKey.DESCRIPTION]: string;
  [EpisodeCreatePayloadKey.STATUS]: EpisodeStatus;
};

export type { EpisodePayload };

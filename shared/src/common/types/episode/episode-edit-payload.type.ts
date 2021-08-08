import { EpisodeCreatePayloadKey, EpisodeType } from '~/common/enums/enums';

type EpisodeEditPayload = {
  [EpisodeCreatePayloadKey.NAME]: string;
  [EpisodeCreatePayloadKey.DESCRIPTION]: string;
  [EpisodeCreatePayloadKey.TYPE]: EpisodeType;
};

export type { EpisodeEditPayload };

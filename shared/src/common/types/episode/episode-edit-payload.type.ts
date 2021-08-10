import { EpisodePayloadKey } from '~/common/enums/enums';
import { EpisodePayload } from './episode-payload.type';

type EpisodeEditPayload = EpisodePayload & {
  [EpisodePayloadKey.RECORD_DATA_URL]: string | null;
  [EpisodePayloadKey.IMAGE_DATA_URL]: string | null;
  [EpisodePayloadKey.USER_ID]: number;
  [EpisodePayloadKey.IMAGE_ID]: number | null;
};

export type { EpisodeEditPayload };

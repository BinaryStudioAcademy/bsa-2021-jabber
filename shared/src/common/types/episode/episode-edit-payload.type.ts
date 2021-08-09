import { EpisodePayloadKey } from '~/common/enums/enums';
import { EpisodePayload } from './episode-payload.type';

type EpisodeEditPayload = EpisodePayload & {
  [EpisodePayloadKey.RECORD_DATA_URL]: string | null;
};

export type { EpisodeEditPayload };

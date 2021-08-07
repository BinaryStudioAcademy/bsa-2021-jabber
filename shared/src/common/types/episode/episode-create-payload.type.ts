import { EpisodePayloadKey } from '~/common/enums/enums';
import { EpisodePayload } from './episode-payload.type';

type EpisodeCreatePayload = EpisodePayload & {
  [EpisodePayloadKey.USER_ID]: number;
  [EpisodePayloadKey.PODCAST_ID]: number;
  [EpisodePayloadKey.RECORD_DATA_URL]: string | null;
};

export type { EpisodeCreatePayload };

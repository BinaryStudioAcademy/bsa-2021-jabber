import { EpisodeCreatePayloadKey } from '~/common/enums/enums';
import { EpisodePayload } from './episode-payload.type';

type EpisodeCreatePayload = EpisodePayload & {
  [EpisodeCreatePayloadKey.USER_ID]: number;
  [EpisodeCreatePayloadKey.PODCAST_ID]: number;
  [EpisodeCreatePayloadKey.RECORD_DATA_URL]: string | null;
};

export type { EpisodeCreatePayload };

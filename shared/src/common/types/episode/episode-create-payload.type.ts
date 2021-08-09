import { EpisodePayloadKey } from '~/common/enums/enums';
import { EpisodePayload, ShownotePayload } from '~/common/types/types';

type EpisodeCreatePayload = EpisodePayload & {
  [EpisodePayloadKey.USER_ID]: number;
  [EpisodePayloadKey.PODCAST_ID]: number;
  [EpisodePayloadKey.IMAGE_DATA_URL]: string | null;
  [EpisodePayloadKey.RECORD_DATA_URL]: string | null;
  [EpisodePayloadKey.SHOWNOTES]: ShownotePayload[];
};

export type { EpisodeCreatePayload };

import { EpisodePayloadKey } from '~/common/enums/enums';
import { ShownotePayload } from '../shownote/shownote-payload.type';
import { EpisodePayload } from './episode-payload.type';

type EpisodeEditPayload = EpisodePayload & {
  [EpisodePayloadKey.RECORD_DATA_URL]: string | null;
  [EpisodePayloadKey.IMAGE_DATA_URL]: string | null;
  [EpisodePayloadKey.USER_ID]: number;
  [EpisodePayloadKey.IMAGE_ID]: number | null;
  [EpisodePayloadKey.SHOWNOTES]: ShownotePayload[];
};

export type { EpisodeEditPayload };

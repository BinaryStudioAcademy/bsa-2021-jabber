import { EpisodeCreatePayloadKey, EpisodeType } from '~/common/enums/enums';
import { ShownotePayload } from '../shownote/shownote-payload.type';

type EpisodeCreatePayload = {
  [EpisodeCreatePayloadKey.NAME]: string;
  [EpisodeCreatePayloadKey.USER_ID]: number;
  [EpisodeCreatePayloadKey.PODCAST_ID]: number;
  [EpisodeCreatePayloadKey.TYPE]: EpisodeType;
  [EpisodeCreatePayloadKey.SHOWNOTES]: ShownotePayload[];
  [EpisodeCreatePayloadKey.DESCRIPTION]: string;
};

export type { EpisodeCreatePayload };

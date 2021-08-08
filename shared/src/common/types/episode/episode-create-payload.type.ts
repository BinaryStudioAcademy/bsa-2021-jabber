import { EpisodeCreatePayloadKey, EpisodeType } from '~/common/enums/enums';
import { ShownoteCreatePayload } from '../shownote/shownote-create-payload.type';

type EpisodeCreatePayload = {
  [EpisodeCreatePayloadKey.NAME]: string;
  [EpisodeCreatePayloadKey.USER_ID]: number;
  [EpisodeCreatePayloadKey.PODCAST_ID]: number;
  [EpisodeCreatePayloadKey.TYPE]: EpisodeType;
  [EpisodeCreatePayloadKey.SHOWNOTES]: ShownoteCreatePayload[];
  [EpisodeCreatePayloadKey.DESCRIPTION]: string;
};

export type { EpisodeCreatePayload };

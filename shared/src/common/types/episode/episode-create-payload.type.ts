import { EpisodeCreatePayloadKey } from '~/common/enums/enums';

type EpisodeCreatePayload = {
  [EpisodeCreatePayloadKey.NAME]: string;
  [EpisodeCreatePayloadKey.USER_ID]: number;
  [EpisodeCreatePayloadKey.PODCAST_ID]: number;
  [EpisodeCreatePayloadKey.TYPE]: string;
};

export type { EpisodeCreatePayload };

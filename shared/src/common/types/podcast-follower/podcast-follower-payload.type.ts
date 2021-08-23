import { PodcastFollowerPayloadKey } from '~/common/enums/enums';

type PodcastFollowerPayload = {
  [PodcastFollowerPayloadKey.PODCAST_ID]: number;
  [PodcastFollowerPayloadKey.FOLLOWER_ID]: number;
};

export type { PodcastFollowerPayload };

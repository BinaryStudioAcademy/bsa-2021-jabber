import { PodcastPayloadKey } from 'common/enums/enums';
import { Podcast } from 'jabber-shared/common/types/types';

type ConfigurationPodcastPayload = Podcast & {
  [PodcastPayloadKey.INVITATION_CODE]: string;
};

export type { ConfigurationPodcastPayload };

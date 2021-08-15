import { PodcastType } from '~/common/enums/enums';

type PodcastsReturnedType = {
  user_id: number;
  type?: PodcastType;
};

export type { PodcastsReturnedType };

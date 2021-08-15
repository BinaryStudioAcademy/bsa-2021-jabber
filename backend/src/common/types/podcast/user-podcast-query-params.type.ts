import { PodcastType } from '~/common/enums/enums';

type UserPodcastQueryParams = {
  user_id: number;
  type?: PodcastType;
};

export type { UserPodcastQueryParams };

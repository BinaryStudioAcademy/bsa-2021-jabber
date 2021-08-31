import { UserFavouriteEpisodePayloadKey } from '~/common/enums/enums';
import { EpisodeWithPodcast } from '~/common/types/types';

type UserFavouriteEpisodeResponse = {
  [UserFavouriteEpisodePayloadKey.EPISODES]: EpisodeWithPodcast[];
  [UserFavouriteEpisodePayloadKey.TOTAL_COUNT]: number;
};

export type { UserFavouriteEpisodeResponse };

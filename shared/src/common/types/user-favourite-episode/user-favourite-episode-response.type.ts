import { UserFavouriteEpisodePayloadKey } from '~/common/enums/enums';
import { Episode } from '~/common/types/types';

type UserFavouriteEpisodeResponse = {
  [UserFavouriteEpisodePayloadKey.EPISODES]: Episode[];
  [UserFavouriteEpisodePayloadKey.TOTAL_COUNT]: number;
};

export type { UserFavouriteEpisodeResponse };

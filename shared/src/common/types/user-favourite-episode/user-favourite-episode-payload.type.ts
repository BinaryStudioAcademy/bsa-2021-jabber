import { UserFavouriteEpisodePayloadKey } from '~/common/enums/enums';

type UserFavouriteEpisodePayload = {
  [UserFavouriteEpisodePayloadKey.EPISODE_ID]: number;
  [UserFavouriteEpisodePayloadKey.USER_ID]: number;
};

export type { UserFavouriteEpisodePayload };

import {
  TableName,
  UserFavouriteEpisodeDTOKey,
} from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class UserFavouriteEpisode extends Abstract {
  [UserFavouriteEpisodeDTOKey.EPISODE_ID]: number;

  [UserFavouriteEpisodeDTOKey.USER_ID]: number;

  static get tableName(): string {
    return TableName.USERS_FAVOURITE_EPISODES;
  }
}

export { UserFavouriteEpisode };

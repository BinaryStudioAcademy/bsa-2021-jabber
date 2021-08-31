import { UserFavouriteEpisode as TUserFavouriteEpisode, UserFavouriteEpisodePayload } from '~/common/types/types';
import { UserFavouriteEpisodeModel as UserFavouriteEpisodeM } from '~/data/models/models';

type Constructor = {
  UserFavouriteEpisodeModel: typeof UserFavouriteEpisodeM;
};

class UserFavouriteEpisode {
  #UserFavouriteEpisodeModel: typeof UserFavouriteEpisodeM;

  constructor({ UserFavouriteEpisodeModel }: Constructor) {
    this.#UserFavouriteEpisodeModel = UserFavouriteEpisodeModel;
  }

  public getByUserIdEpisodeId({ userId, episodeId }: UserFavouriteEpisodePayload): Promise<TUserFavouriteEpisode> {
    return this.#UserFavouriteEpisodeModel.query()
      .findOne({
        'user_id': userId,
        'episode_id': episodeId,
      });
  }

  public create(payload: UserFavouriteEpisodePayload): Promise<TUserFavouriteEpisode> {
    return this.#UserFavouriteEpisodeModel.query().insert(payload);
  }

  public delete({ episodeId, userId }: UserFavouriteEpisodePayload): Promise<TUserFavouriteEpisode> {
    return this.#UserFavouriteEpisodeModel.query()
      .delete()
      .where('user_id', userId)
      .where('episode_id', episodeId)
      .returning('*')
      .first();
  }
}

export { UserFavouriteEpisode };

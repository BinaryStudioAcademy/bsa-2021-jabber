import { UserFollower as TUserFollower, UserFollowerPayload } from '~/common/types/types';
import { UserFollowerModel as UserFollowerM } from '~/data/models/models';

type Constructor = {
  UserFollowerModel: typeof UserFollowerM;
};

class UserFollower {
  #UserFollowerModel: typeof UserFollowerM;

  constructor({ UserFollowerModel }: Constructor) {
    this.#UserFollowerModel = UserFollowerModel;
  }

  public getCountByUserId(userId: number): Promise<number> {
    return this.#UserFollowerModel.query()
      .where('user_id', userId)
      .resultSize();
  }

  public getByUserIdFollowerId({ userId, followerId }: UserFollowerPayload): Promise<TUserFollower> {
    return this.#UserFollowerModel.query()
      .findOne({
        'user_id': userId,
        'follower_id': followerId,
      });
  }

  public create(payload: UserFollowerPayload): Promise<TUserFollower> {
    return this.#UserFollowerModel.query().insert(payload);
  }

  public delete({ userId, followerId }: UserFollowerPayload): Promise<TUserFollower> {
    return this.#UserFollowerModel.query()
      .delete()
      .where('user_id', userId)
      .where('follower_id', followerId)
      .returning('*')
      .first();
  }

  public getAllByUserId(userId: number): Promise<TUserFollower[]> {
    return this.#UserFollowerModel.query()
      .where('user_id', userId)
      .withGraphJoined('[user]');
  }
}

export { UserFollower };

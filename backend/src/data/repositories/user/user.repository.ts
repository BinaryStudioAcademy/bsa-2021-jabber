import {
  User as TUser,
  UserCreatePayload,
  UserEditDTOPayload,
  UserPopularLoadFilter,
  UserUpdatePasswordDTOPayload,
  UserWithPasswordPayload,
} from '~/common/types/types';
import { UserModel as UserM } from '~/data/models/models';

type Constructor = {
  UserModel: typeof UserM;
};

class User {
  #UserModel: typeof UserM;

  constructor({ UserModel }: Constructor) {
    this.#UserModel = UserModel;
  }

  public getAll(): Promise<TUser[]> {
    return this.#UserModel.query().withGraphJoined('[image]').omit(['password']);
  }

  public create(payload: UserCreatePayload): Promise<TUser> {
    return this.#UserModel.query().insert(payload).omit(['password']);
  }

  public getByEmail(email: string): Promise<UserWithPasswordPayload> {
    return this.#UserModel.query().findOne('email', email).withGraphJoined('[image]');
  }

  public getById(id: number): Promise<TUser> {
    return this.#UserModel.query()
      .findById(id)
      .withGraphJoined('[image]')
      .omit(['password']);
  }

  public update(id: number, payload: UserEditDTOPayload): Promise<TUser> {
    return this.#UserModel.query().updateAndFetchById(id, payload).omit(['password']);
  }

  public updatePassword(id: number, payload: UserUpdatePasswordDTOPayload): Promise<TUser> {
    return this.#UserModel.query().patch(payload).findById(id).omit(['password']);
  }

  public getPopular(filter: UserPopularLoadFilter): Promise<TUser[]> {
    const { limit } = filter;

    return this.#UserModel.query()
      .withGraphJoined('[image]')
      .select(
        'users.*',
        this.#UserModel.relatedQuery('popularUsers')
          .count()
          .as('followersCount'),
      )
      .orderBy('followersCount', 'DESC')
      .omit(['followersCount', 'password'])
      .limit(limit);
  }

  public getFollowersByUserId(userId: number): Promise<TUser[]> {
    return this.#UserModel.query()
      .withGraphJoined('[image]')
      .joinRelated('[followers]')
      .where('user_id', userId)
      .omit(['password']);
  }
}

export { User };

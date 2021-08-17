import {
  User as TUser,
  UserCreatePayload,
  UserEditPayload,
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
    return this.#UserModel.query();
  }

  public create(payload: UserCreatePayload): Promise<TUser> {
    return this.#UserModel.query().insert(payload);
  }

  public getByEmail(email: string): Promise<TUser> {
    return this.#UserModel.query().findOne('email', email);
  }

  public getById(id: number): Promise<TUser> {
    return this.#UserModel.query().findById(id);
  }

  public update(id: number, payload: UserEditPayload): Promise<TUser> {
    return this.#UserModel.query().updateAndFetchById(id, payload);
  }
}

export { User };

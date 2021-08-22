import {
  UserFollower as TUserFollower,
  UserFollowerPayload,
} from '~/common/types/types';
import { ErrorMessage, HttpCode } from '~/common/enums/enums';
import { HttpError } from '~/exceptions/exceptions';
import { userFollower as userFollowerRep } from '~/data/repositories/repositories';

type Constructor = {
  userFollowerRepository: typeof userFollowerRep;
};

class UserFollower {
  #userFollowerRepository: typeof userFollowerRep;

  constructor({ userFollowerRepository }: Constructor) {
    this.#userFollowerRepository = userFollowerRepository;
  }

  public getCountByUserId(userId: number): Promise<number> {
    return this.#userFollowerRepository.getCountByUserId(userId);
  }

  public isFollowed(payload: UserFollowerPayload): Promise<TUserFollower> {
    return this.#userFollowerRepository.getByUserIdFollowerId(payload);
  }

  public async create(payload: UserFollowerPayload): Promise<TUserFollower> {
    const userFollower = await this.#userFollowerRepository.getByUserIdFollowerId(payload);

    if (userFollower) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: ErrorMessage.ALREADY_FOLLOWING,
      });
    }

    return this.#userFollowerRepository.create(payload);
  }

  public delete(payload: UserFollowerPayload): Promise<TUserFollower> {
    return this.#userFollowerRepository.delete(payload);
  }
}

export { UserFollower };

import { User as TUser } from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import { HttpError } from '~/exceptions/exceptions';
import { HttpCode, ErrorMessage } from '~/common/enums/enums';

type Constructor = {
  userRepository: typeof userRep;
};

class User {
  #userRepository: typeof userRep;

  constructor({ userRepository }: Constructor) {
    this.#userRepository = userRepository;
  }

  public async getById(id: string): Promise<TUser> {
    const user = await this.#userRepository.getById(id);
    if (!user) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.NOT_FOUND,
      });
    }
    return user;
  }

  public getAll(): Promise<TUser[]> {
    return this.#userRepository.getAll();
  }
}

export { User };

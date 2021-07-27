import { User as TUser } from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';

type Constructor = {
  userRepository: typeof userRep;
};

class User {
  #userRepository: typeof userRep;

  constructor({ userRepository }: Constructor) {
    this.#userRepository = userRepository;
  }

  getAll(): Promise<TUser[]> {
    return this.#userRepository.getAll();
  }
}

export { User };

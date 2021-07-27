import { UserCreatePayload, User } from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';

type Constructor = {
  userRepository: typeof userRep;
};

class Auth {
  #userRepository: typeof userRep;

  constructor({ userRepository }: Constructor) {
    this.#userRepository = userRepository;
  }

  signUp(payload: UserCreatePayload): Promise<User> {
    return this.#userRepository.create(payload);
  }
}

export { Auth };

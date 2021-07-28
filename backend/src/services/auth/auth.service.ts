import { UserCreatePayload, User } from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import { encrypt } from '~/helpers/crypt/crypt';

type Constructor = {
  userRepository: typeof userRep;
};

class Auth {
  #userRepository: typeof userRep;

  constructor({ userRepository }: Constructor) {
    this.#userRepository = userRepository;
  }

  async signUp(payload: UserCreatePayload): Promise<User> {
    const { password } = payload;

    return this.#userRepository.create({
      ...payload,
      password: await encrypt(password),
    });
  }
}

export { Auth };

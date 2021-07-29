import { UserCreatePayload, User, SignInPayload } from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import { encrypt, cryptCompare } from '~/helpers/helpers';

type Constructor = {
  userRepository: typeof userRep;
};

class Auth {
  #userRepository: typeof userRep;

  constructor({ userRepository }: Constructor) {
    this.#userRepository = userRepository;
  }

  public async signUp(payload: UserCreatePayload): Promise<User> {
    const { password } = payload;

    return this.#userRepository.create({
      ...payload,
      password: await encrypt(password),
    });
  }

  public async signIn(payload: SignInPayload): Promise<User | null> {
    const { password, email } = payload;
    const user = await this.#userRepository.getByEmail(email);

    if (!user || !(await cryptCompare(password, user.password))){
      return Promise.resolve(null);
    }

    return Promise.resolve(user);
  }
}

export { Auth };

import { UserCreatePayload, User, LoginPayload } from '~/common/types/types';
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

  public async signIn(payload: LoginPayload): Promise<User> {
    const { password, email } = payload;
    const user = await this.#userRepository.getByEmail(email);

    if (!user || !(await cryptCompare(password, user.password))){
      return Promise.reject();
    }

    return Promise.resolve(user);
  }
}

export { Auth };

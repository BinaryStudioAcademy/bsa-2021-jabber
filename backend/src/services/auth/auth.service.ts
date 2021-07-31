import { UserCreatePayload, User, SignInPayload } from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import { encrypt, checkIsCryptsEqual  } from '~/helpers/helpers';
import { HttpError } from "~/exceptions/exceptions";
import { HttpCode } from "~/common/enums/enums";

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

    if (!user || !(await checkIsCryptsEqual (password, user.password))){
      throw new HttpError({ status: HttpCode.NOT_FOUND, message: ErrorMessage.NOT_FOUND })
    }

    return user;
  }
}

export { Auth };

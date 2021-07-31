import { UserCreatePayload, User, SignInPayload } from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import { encrypt, checkIsCryptsEqual  } from '~/helpers/helpers';
import { HttpError } from '~/exceptions/exceptions';
import { HttpCode, ErrorMessage } from '~/common/enums/enums';

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

  public async signIn(payload: SignInPayload): Promise<User | never> {
    const { password, email } = payload;
    const user = await this.#userRepository.getByEmail(email);
    const hasUser = Boolean(user);

    if (!hasUser) {
      throw new HttpError({ status: HttpCode.NOT_FOUND, message: ErrorMessage.USER_NOT_FOUND });
    }

    const isCryptsEqual = await checkIsCryptsEqual (password, user.password);
    if (!isCryptsEqual) {
      throw new HttpError({status: HttpCode.BAD_REQUEST, message: ErrorMessage.WRONG_PASSWORD});
    }

    return user;
  }
}

export { Auth };

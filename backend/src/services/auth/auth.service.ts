import { UserCreatePayload, UserSignInPayload, SignResponse } from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import { encrypt, checkIsCryptsEqual, createToken } from '~/helpers/helpers';
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

  public async signUp(payload: UserCreatePayload): Promise<SignResponse> {
    const { password } = payload;
    const user = await this.#userRepository.create({
      ...payload,
      password: await encrypt(password),
    });
    const token = createToken(user.createdAt);

    return {
      token,
      user,
    };
  }

  public async signIn(payload: UserSignInPayload): Promise<SignResponse> {
    const { password, email } = payload;
    const user = await this.#userRepository.getByEmail(email);
    const token = createToken(user.createdAt);

    const hasUser = Boolean(user);

    if (!hasUser) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.USER_NOT_FOUND,
      });
    }

    const isCryptsEqual = await checkIsCryptsEqual(password, user.password);

    if (!isCryptsEqual) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: ErrorMessage.WRONG_PASSWORD,
      });
    }

    return {
      token,
      user,
    };
  }
}

export { Auth };

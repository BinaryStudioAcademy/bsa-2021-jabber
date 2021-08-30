import {
  UserCreatePayload,
  UserSignInPayload,
  SignResponse,
  UserResetPasswordPayload,
} from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import { encrypt, checkIsCryptsEqual, getRandomId, getResetPasswordMessageTemplate } from '~/helpers/helpers';
import { HttpError } from '~/exceptions/exceptions';
import { HttpCode, ErrorMessage, ENV } from '~/common/enums/enums';
import { USER_NEW_PASSWORD_LENGTH } from '~/common/constants/constants';
import { token } from '../services';
import { Mailer } from '~/services/mailer/mailer.service';

type Constructor = {
  userRepository: typeof userRep;
  tokenService: typeof token;
  mailer: Mailer;
};

class Auth {
  #userRepository: typeof userRep;
  #tokenService: typeof token;
  #mailer: Mailer;

  constructor({ userRepository, tokenService, mailer }: Constructor) {
    this.#userRepository = userRepository;
    this.#tokenService = tokenService;
    this.#mailer = mailer;
  }

  public async signUp(payload: UserCreatePayload): Promise<SignResponse> {
    const { password } = payload;
    const user = await this.#userRepository.create({
      ...payload,
      password: await encrypt(password),
    });
    const token = this.#tokenService.create({
      userId: user.id,
    });

    return {
      token,
      user,
    };
  }

  public async signIn(payload: UserSignInPayload): Promise<SignResponse> {
    const { password, email } = payload;
    const user = await this.#userRepository.getByEmail(email);

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

    const token = this.#tokenService.create({
      userId: user.id,
    });

    return {
      token,
      user,
    };
  }

  public async resetPassword(payload: UserResetPasswordPayload): Promise<boolean> {
    const { email } = payload;
    const user = await this.#userRepository.getByEmail(email);
    const hasUser = Boolean(user);

    if (!hasUser) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.EMAIL_DOES_NOT_EXIST,
      });
    }

    const newPassword = getRandomId(USER_NEW_PASSWORD_LENGTH);

    const isEmailSent = await this.#mailer.sendMail(getResetPasswordMessageTemplate(newPassword, user.email), <string>ENV.MAILER.EMAIL);

    if (!isEmailSent) {
      throw new HttpError({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        message: ErrorMessage.EMAIL_SENDING_ERROR,
      });
    }

    await this.#userRepository.updatePassword(user.id, { password: await encrypt(newPassword) });

    return true;
  }
}

export { Auth };

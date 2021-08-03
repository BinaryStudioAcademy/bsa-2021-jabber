import { UserCreatePayload, UserSignInPayload, SignResponse } from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import { encrypt, checkIsCryptsEqual } from '~/helpers/helpers';
import { HttpError } from '~/exceptions/exceptions';
import { HttpCode, ErrorMessage } from '~/common/enums/enums';
import { token } from '../services';
import { User as TUser } from '~/common/types/types';
import jwt from 'jsonwebtoken';

type Constructor = {
  userRepository: typeof userRep;
  tokenService: typeof token;
  secret: string;
};

class Auth {
  #userRepository: typeof userRep;
  #tokenService: typeof token;
  #secret: string;

  constructor({ userRepository, tokenService, secret }: Constructor) {
    this.#userRepository = userRepository;
    this.#tokenService = tokenService;
    this.#secret = secret;
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
    const token = this.#tokenService.create({
      userId: user.id,
    });

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

  public getDecodedAccessToken(token: string): any {
    const decodedToken = jwt.verify(token, this.#secret, (err, decode) => {
      if (err) {
        throw new HttpError({
          status: HttpCode.UNAUTHORIZED,
          message: ErrorMessage.UNAUTHORIZED_TOKEN,
        });
      }
      return decode;
    })
    return decodedToken;
  };

  public async getByToken(token: string): Promise<TUser> {
    const decodedToken = this.getDecodedAccessToken(token);
    const user = await this.#userRepository.getById(decodedToken.userId);

    const hasUser = Boolean(user);

    if (!hasUser) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.USER_NOT_FOUND,
      });
    }
    
    return user;
  };
}

export { Auth };

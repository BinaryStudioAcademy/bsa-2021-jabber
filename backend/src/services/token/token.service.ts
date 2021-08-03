import jwt from 'jsonwebtoken';
import { ErrorMessage, HttpCode } from '~/common/enums/enums';
import { TokenPayload, User as TUser } from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import { HttpError } from '~/exceptions/exceptions';

type Constructor = {
  secret: string;
  userRepository: typeof userRep;
};

class Token {
  #secret: string;
  #userRepository: typeof userRep;

  constructor({ secret, userRepository }: Constructor) {
    this.#secret = secret;
    this.#userRepository = userRepository;
  }

  create(data: TokenPayload): string {
    return jwt.sign(data, this.#secret, {});
  }

  private decode<T>(token: string): T {
    return <T>jwt.decode(token);
  }

  public async getByToken(token: string): Promise<TUser> {
    const decoded = this.decode<TokenPayload>(token);
    if (!decoded) {
      throw new HttpError({
        status: HttpCode.UNAUTHORIZED,
        message: ErrorMessage.UNAUTHORIZED_TOKEN,
      });
    }
    const user = await this.#userRepository.getById(String(decoded.userId));

    return user;
  }
}

export { Token };

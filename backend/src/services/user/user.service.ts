import { User as TUser, TokenPayload } from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import { ErrorMessage, HttpCode } from '~/common/enums/enums';
import { HttpError } from '~/exceptions/exceptions';
import { token } from '../services';

type Constructor = {
  userRepository: typeof userRep;
  tokenService: typeof token;
};

class User {
  #userRepository: typeof userRep;
  #tokenService: typeof token;

  constructor({ userRepository, tokenService }: Constructor) {
    this.#userRepository = userRepository;
    this.#tokenService = tokenService;
  }

  public getAll(): Promise<TUser[]> {
    return this.#userRepository.getAll();
  }

  public getById(id: number): Promise<TUser> {
    return this.#userRepository.getById(id);
  }

  public async getByToken(token: string): Promise<TUser> {
    const decoded = this.#tokenService.decode<TokenPayload>(token);
    if (!decoded) {
      throw new HttpError({
        status: HttpCode.UNAUTHORIZED,
        message: ErrorMessage.UNAUTHORIZED_TOKEN,
      });
    }
    const user = await this.#userRepository.getById(Number(decoded.userId));

    return user;
  }
}

export { User };

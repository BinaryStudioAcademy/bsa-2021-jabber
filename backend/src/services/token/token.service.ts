import jwt from 'jsonwebtoken';
import { ENV } from '~/common/enums/enums';
import { TokenPayload } from '~/common/types/types';

class Token {
  #secret: string;

  constructor() {
    this.#secret = String(ENV.JWT.SECRET);
  }

  create(data: TokenPayload): string {
    return jwt.sign(data, this.#secret, {});
  }
}

export { Token };

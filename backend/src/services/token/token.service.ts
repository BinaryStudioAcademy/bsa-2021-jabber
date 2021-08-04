import jwt from 'jsonwebtoken';
import { TokenPayload } from '~/common/types/types';

type Constructor = {
  secret: string;
};

class Token {
  #secret: string;

  constructor({ secret }: Constructor) {
    this.#secret = secret;
  }

  create(data: TokenPayload): string {
    return jwt.sign(data, this.#secret, {});
  }

  public decode<T>(token: string): T {
    return <T>jwt.decode(token);
  }
}

export { Token };

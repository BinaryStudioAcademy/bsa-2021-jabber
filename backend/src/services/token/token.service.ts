import jwt from 'jsonwebtoken';
import { ENV } from '~/common/enums/enums';
import { Data } from './common/types/types';

class Token {

  create(data: Data): string {
    return jwt.sign(data, <string>ENV.JWT.SECRET, {});
  }
}

export { Token };

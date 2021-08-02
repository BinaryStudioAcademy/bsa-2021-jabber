import jwt from 'jsonwebtoken';
import { ENV } from '~/common/enums/enums';

const createToken = (data: string): string => jwt.sign({ data }, <string>ENV.JWT.SECRET, {});

export { createToken };

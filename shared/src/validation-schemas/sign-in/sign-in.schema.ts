import * as Joi from 'joi';
import { UserSignInPayload } from '../../common/types/types';

const SigninSchema = Joi.object<UserSignInPayload>({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(3).required(),
});

export { SigninSchema };

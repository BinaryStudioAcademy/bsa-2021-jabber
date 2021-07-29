import * as Joi from 'joi';
import { UserCreatePayload } from '~/common/types/types';

const SignupSchema = Joi.object<UserCreatePayload>({
  firstName: Joi.string().min(3).max(15).required(),
  lastName: Joi.string().min(3).max(15).required(),
  nickname: Joi.string().min(3).max(15).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(3).max(15).required(),
  birthdate: Joi.date().raw().required(),
});

export { SignupSchema };

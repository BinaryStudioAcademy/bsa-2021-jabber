import * as Joi from 'joi';
import { UserCreatePayload } from '~/common/types/types';

const SignupSchema = Joi.object<UserCreatePayload>({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  nickname: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  birthdate: Joi.date().raw().required(),
});

export { SignupSchema };

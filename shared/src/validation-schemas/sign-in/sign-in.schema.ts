import * as Joi from 'joi';
import { UserSignInPayload } from '../../common/types/types';
import {UserCreatePayloadKey} from "~/common/enums/enums";

const SigninSchema = Joi.object<UserSignInPayload>({
  [UserCreatePayloadKey.EMAIL]: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  [UserCreatePayloadKey.PASSWORD]: Joi.string().min(3).required(),
});

export { SigninSchema };

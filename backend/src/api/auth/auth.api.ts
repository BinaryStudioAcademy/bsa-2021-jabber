import { Router } from 'express';
import {
  signUp as signUpValidationSchema,
  signIn as signInValidationSchema,
} from '~/validation-schemas/validation-schemas';
import { ApiPath, HttpCode, AuthApiPath, ENV } from '~/common/enums/enums';
import { handleAsyncApi } from '~/helpers/helpers';
import { validateSchema as validateSchemaMiddleware } from '~/middlewares/middlewares';
import { auth as authService } from '~/services/services';
import jwt from 'jsonwebtoken';

type Args = {
  apiRouter: Router;
  authService: typeof authService;
};

const initAuthApi = ({ apiRouter, authService }: Args): Router => {
  const userRouter = Router();

  apiRouter.use(ApiPath.AUTH, userRouter);

  userRouter.post(
    AuthApiPath.SIGN_UP,
    validateSchemaMiddleware(signUpValidationSchema),
    handleAsyncApi(async (req, res) => {
      const user = await authService.signUp(req.body);

      return res.json(user).status(HttpCode.CREATED);
    }),
  );

  userRouter.post(
    AuthApiPath.SIGN_IN,
    validateSchemaMiddleware(signInValidationSchema),
    handleAsyncApi(async (req, res) => {
      const user = await authService.signIn(req.body);

      return res.json(user).status(HttpCode.OK);
    }),
  );

  userRouter.get(
    '/me',
    handleAsyncApi(async (req, res) => {
      const token = req.headers.authorization?.split(' ')[1];
      const user = await authService.getByToken(String(token));
      res.status(200).send(user);
    }),
  );

  return userRouter;
};

export { initAuthApi };

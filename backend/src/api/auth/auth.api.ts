import { Router } from 'express';
import {
  signUp as signUpValidationSchema,
  signIn as signInValidationSchema,
} from '~/validation-schemas/validation-schemas';
import { ApiPath, HttpCode, AuthApiPath } from '~/common/enums/enums';
import { handleAsyncApi, extractAuthToken } from '~/helpers/helpers';
import {
  validateSchema as validateSchemaMiddleware,
  authentication as authenticationMiddleware,
  registration as registrationMiddleware,
} from '~/middlewares/middlewares';
import { auth as authService, user as userService } from '~/services/services';

type Args = {
  apiRouter: Router;
  authService: typeof authService;
};

const initAuthApi = ({ apiRouter, authService }: Args): Router => {
  const userRouter = Router();

  apiRouter.use(ApiPath.AUTH, userRouter);

  userRouter.post(
    AuthApiPath.SIGN_UP,
    registrationMiddleware,
    validateSchemaMiddleware(signUpValidationSchema),
    handleAsyncApi(async (req, res) => {
      const user = await authService.signUp(req.body);

      return res.json(user).status(HttpCode.CREATED);
    }),
  );

  userRouter.post(
    AuthApiPath.SIGN_IN,
    authenticationMiddleware,
    validateSchemaMiddleware(signInValidationSchema),
    handleAsyncApi(async (req, res) => {
      const user = await authService.signIn(req.body);

      return res.json(user).status(HttpCode.OK);
    }),
  );

  userRouter.get(
    AuthApiPath.CURRENT_USER,
    handleAsyncApi(async (req, res) => {
      const token = extractAuthToken(req.headers.authorization);

      res.send(await userService.getByToken(String(token))).status(HttpCode.OK);
    }),
  );

  return userRouter;
};

export { initAuthApi };

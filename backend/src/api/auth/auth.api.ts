import { Router } from 'express';
import { SignupSchema } from '~/validation-schemas/validation-schemas';
import { ApiPath, HttpCode, AuthApiPath } from '~/common/enums/enums';
import { handleAsyncApi } from '~/helpers/helpers';
import { validate } from '~/middlewares/middlewares';
import { auth as authService } from '~/services/services';

type Args = {
  apiRouter: Router;
  authService: typeof authService;
};

const validateSignup = validate(SignupSchema);

const initAuthApi = ({ apiRouter, authService }: Args): Router => {
  const userRouter = Router();

  apiRouter.use(ApiPath.AUTH, userRouter);

  userRouter.post(
    AuthApiPath.SIGN_UP,
    validateSignup,
    handleAsyncApi(async (req, res) => {
      const user = await authService.signUp(req.body);

      return res.json(user).status(HttpCode.CREATED);
    }),
  );

  return userRouter;
};

export { initAuthApi };

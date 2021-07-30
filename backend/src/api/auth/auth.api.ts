import { Router } from 'express';
import { signUp as signUpValidationSchema } from '~/validation-schemas/validation-schemas';
import { ApiPath, HttpCode, AuthApiPath } from '~/common/enums/enums';
import { handleAsyncApi } from '~/helpers/helpers';
import { validateSchema } from '~/middlewares/middlewares';
import { auth as authService } from '~/services/services';

type Args = {
  apiRouter: Router;
  authService: typeof authService;
};

const initAuthApi = ({ apiRouter, authService }: Args): Router => {
  const userRouter = Router();

  apiRouter.use(ApiPath.AUTH, userRouter);

  userRouter.post(
    AuthApiPath.SIGN_UP,
    validateSchema(signUpValidationSchema),
    handleAsyncApi(async (req, res) => {
      const user = await authService.signUp(req.body);

      return res.json(user).status(HttpCode.CREATED);
    }),
  );

  return userRouter;
};

export { initAuthApi };

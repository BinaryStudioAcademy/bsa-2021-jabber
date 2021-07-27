import { Router } from 'express';
import { ApiPath, HttpCode, AuthApiPath } from '~/common/enums/enums';
import { handleAsyncApi } from '~/helpers/helpers';
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
    handleAsyncApi(async (req, res) => {
      const user = await authService.signUp(req.body);

      return res.json(user).status(HttpCode.CREATED);
    }),
  ).post(
    AuthApiPath.SIGN_IN,
    handleAsyncApi(async (req, res) => {
      const user = await authService.signIn(req.body.login);
      if(!user || (user.password !== req.body.password)){
        return res.json('user not found').status(HttpCode.NOT_FOUND);
      }
      return res.json(user).status(HttpCode.OK);
    }),
  );

  return userRouter;
};

export { initAuthApi };

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
  );

  userRouter.post(
    AuthApiPath.SIGN_IN,
    handleAsyncApi(async (req, res) => {
      const user = await authService.signIn(req.body);

      if(!user){
        return res.status(HttpCode.NOT_FOUND);
      }

      return res.json(user).status(HttpCode.OK);
    }),
  );

  return userRouter;
};

export { initAuthApi };

import { Router } from 'express';
import {
  ApiPath,
  HttpCode,
  HttpMethod,
  UsersApiPath,
} from '~/common/enums/enums';
import { UserPopularLoadFilter } from '~/common/types/types';
import { editUser as editUserValidationSchema } from '~/validation-schemas/validation-schemas';
import { handleAsyncApi } from '~/helpers/helpers';
import { user as userService } from '~/services/services';
import {
  checkAuth as checkAuthMiddleware,
  checkUserHasPermitToEdit as checkUserHasPermitToEditMiddleware,
  validateSchema as validateSchemaMiddleware,
} from '~/middlewares/middlewares';

type Args = {
  apiRouter: Router;
  userService: typeof userService;
};

const initUsersApi = ({ apiRouter, userService }: Args): Router => {
  const userRouter = Router();

  apiRouter.use(ApiPath.USERS, userRouter);

  userRouter.get(
    UsersApiPath.ROOT,
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (_req, res) => {
      return res.json(await userService.getAll()).status(HttpCode.OK);
    }),
  );

  userRouter.get(
    UsersApiPath.POPULAR,
    handleAsyncApi(async (req, res) => {
      return res
        .json(await userService.getPopular(req.query as unknown as UserPopularLoadFilter))
        .status(HttpCode.OK);
    }),
  );

  userRouter.get(
    UsersApiPath.$ID,
    handleAsyncApi(async (req, res) => {
      return res
        .json(await userService.getById(Number(req.params.id)))
        .status(HttpCode.OK);
    }),
  );

  userRouter.get(
    UsersApiPath.$USER_ID_FOLLOWERS,
    handleAsyncApi(async (req, res) => {
      return res
        .json(await userService.getFollowersByUserId(Number(req.params.userId)))
        .status(HttpCode.OK);
    }),
  );

  userRouter.put(
    UsersApiPath.$ID,
    checkAuthMiddleware(HttpMethod.PUT),
    checkUserHasPermitToEditMiddleware(),
    validateSchemaMiddleware(editUserValidationSchema),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await userService.update(Number(req.params.id), req.body))
        .status(HttpCode.OK);
    }),
  );

  return userRouter;
};

export { initUsersApi };

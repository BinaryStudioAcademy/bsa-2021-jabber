import { Router } from 'express';
import { ApiPath, HttpCode, NotificationsApiPath, HttpMethod } from '~/common/enums/enums';
import { userNotification as userNotificationService } from '~/services/services';
import { handleAsyncApi } from '~/helpers/helpers';
import {
  checkAuth as checkAuthMiddleware,
} from '~/middlewares/middlewares';

type Args = {
  apiRouter: Router;
  userNotificationService: typeof userNotificationService;
};

const initNotificationApi = ({ apiRouter, userNotificationService }: Args): Router => {
  const notificationRouter = Router();

  apiRouter.use(ApiPath.NOTIFICATIONS, notificationRouter);

  notificationRouter.get(
    NotificationsApiPath.USER,
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await userNotificationService.getAllByUserId(Number(req.user?.id)))
        .status(HttpCode.OK);
    }),
  );

  notificationRouter.get(
    NotificationsApiPath.COUNT,
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await userNotificationService.getCountUncheckedByUserId(Number(req.user?.id)))
        .status(HttpCode.OK);
    }),
  );

  notificationRouter.put(
    NotificationsApiPath.$ID,
    checkAuthMiddleware(HttpMethod.PUT),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await userNotificationService.update(Number(req.params.id), req.body))
        .status(HttpCode.OK);
    }),
  );

  return notificationRouter;
};

export { initNotificationApi };

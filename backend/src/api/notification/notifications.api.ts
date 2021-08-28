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
    NotificationsApiPath.$ID,
    checkAuthMiddleware(HttpMethod.GET),
    handleAsyncApi(async (req, res) => {
      return res
        .json(await userNotificationService.getAllByUserId(Number(req.params.id)))
        .status(HttpCode.OK);
    }),
  );

  return notificationRouter;
};

export { initNotificationApi };

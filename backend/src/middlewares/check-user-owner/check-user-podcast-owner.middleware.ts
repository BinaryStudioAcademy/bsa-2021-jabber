import { RequestHandler } from 'express';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage, HttpCode, UserRole } from '~/common/enums/enums';
import { podcast as podcastService } from '~/services/services';

const checkUserPodcastOwner = (): RequestHandler => {
  const handler: RequestHandler = async (req, _res, next) => {
    if (req.user?.role === UserRole.MASTER) {
      return next();
    }
    const podcastId = req.params.id ?? req.body.podcastId;
    const { userId: podcastOwnerId } = await podcastService.getById(Number(podcastId));

    if (req.user?.id !== podcastOwnerId) {
      next(new HttpError({
        status: HttpCode.UNAUTHORIZED,
        message: ErrorMessage.NOT_YOURS_PODCAST,
      }));
    }

    next();
  };

  return handler;
};

export { checkUserPodcastOwner };

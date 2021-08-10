import { RequestHandler } from 'express';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage, HttpCode } from '~/common/enums/enums';
import { podcast as podcastService } from '~/services/services';

const checkUserOwner = (): RequestHandler => {
  const handler: RequestHandler = async (req, _res, next) => {
    let podcastId = req.params.id;
    if (!podcastId) {
      podcastId = req.body.podcastId;
    }
    const { userId: podcastOwnerId } = await podcastService.getById(podcastId);

    if (req.user?.id !== podcastOwnerId) {
      const err = new HttpError({
        status: HttpCode.UNAUTHORIZED,
        message: ErrorMessage.NOT_YOURS_PODCAST,
      });
      next(err);
    }

    next();
  };

  return handler;
};

export { checkUserOwner };

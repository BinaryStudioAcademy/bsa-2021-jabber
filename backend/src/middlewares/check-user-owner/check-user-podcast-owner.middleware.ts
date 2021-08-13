import { RequestHandler } from 'express';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage, HttpCode } from '~/common/enums/enums';
import { podcast as podcastService } from '~/services/services';

const checkUserPodcastOwner = (): RequestHandler => {
  const handler: RequestHandler = async (req, _res, next) => {
    const podcastId = req.params.id ?? req.body.podcastId;
    const { userId: podcastOwnerId } = await podcastService.getById(podcastId);

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

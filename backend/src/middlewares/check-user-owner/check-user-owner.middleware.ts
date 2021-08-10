import { RequestHandler } from 'express';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage, HttpCode } from '~/common/enums/enums';
import { podcast as podcastService } from '~/services/services';

// this code not used, it is for example
const checkUserOwner: RequestHandler = async (req, _res, next) => {
  const { userId: podcastOwnerId } = await podcastService.getById(req.body.podcastId);
  const { userId: podcastOwnerId2 } = await podcastService.getById(req.params.id);
  // eslint-disable-next-line no-console
  console.log(podcastOwnerId2);
  if (req.user?.id === podcastOwnerId) {
    next();
  }
  throw new HttpError({
    status: HttpCode.UNAUTHORIZED,
    message: ErrorMessage.NOT_YOURS_PODCAST,
  });
};

export { checkUserOwner };

import { RequestHandler } from 'express';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage, HttpCode } from '~/common/enums/enums';
import { episode as episodeService } from '~/services/services';

const checkUserEpisodeOwner = (): RequestHandler => {
  const handler: RequestHandler = async (req, _res, next) => {
    const episodeId = req.params.id;
    const { userId: episodeOwnerId } = await episodeService.getById(Number(episodeId));

    if (req.user?.id !== episodeOwnerId) {
      next(new HttpError({
        status: HttpCode.UNAUTHORIZED,
        message: ErrorMessage.NOT_YOURS_EPISODE,
      }));
    }

    next();
  };

  return handler;
};

export { checkUserEpisodeOwner };
import { RequestHandler } from 'express';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage, HttpCode, UserRole } from '~/common/enums/enums';
import { playlist as playlistService } from '~/services/services';

const checkUserPlaylistOwner = (): RequestHandler => {
  const handler: RequestHandler = async (req, _res, next) => {
    if (req.user?.role === UserRole.MASTER) {
      return next();
    }
    const playlistId = req.params.id ?? req.body.playlistId;
    const { userId } = await playlistService.getById(Number(playlistId));

    if (req.user?.id !== userId) {
      next(new HttpError({
        status: HttpCode.FORBIDDEN,
        message: ErrorMessage.NOT_YOURS_PLAYLIST,
      }));
    }

    next();
  };

  return handler;
};

export { checkUserPlaylistOwner };

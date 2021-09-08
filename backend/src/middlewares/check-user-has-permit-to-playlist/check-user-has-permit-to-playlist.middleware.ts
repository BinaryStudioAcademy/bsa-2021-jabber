import { RequestHandler } from 'express';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage, HttpCode, UserRole, PlaylistStatus } from '~/common/enums/enums';
import { playlist as playlistService } from '~/services/services';

const checkUserHasPermitToPlaylist = (): RequestHandler => {
  const handler: RequestHandler = async (req, _res, next) => {
    if (req.user?.role === UserRole.MASTER) {
      return next();
    }

    const playlistId = Number(req.params.id ?? req.params.playlistId);
    const userId = req.user?.id;

    try {
      const playlist = await playlistService.getById(playlistId);
      if (playlist.status === PlaylistStatus.PUBLISHED || playlist.userId === userId) {
        return next();
      }
    } catch (err) {
      return next(new HttpError({
        status: HttpCode.NOT_FOUND,
        message: err.message,
      }));
    }

    next(new HttpError({
      status: HttpCode.FORBIDDEN,
      message: ErrorMessage.THIS_IS_A_PRIVATE_PLAYLIST,
    }));
  };

  return handler;
};

export { checkUserHasPermitToPlaylist };

import { RequestHandler } from 'express';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage, HttpCode, UserRole, PodcastType } from '~/common/enums/enums';
import {
  podcast as podcastService,
  episode as episodeService,
  podcastFollower as podcastFollowerService,
} from '~/services/services';

const checkUserHasPermitToEpisode = (): RequestHandler => {
  const handler: RequestHandler = async (req, _res, next) => {
    if (req.user?.role === UserRole.MASTER) {
      return next();
    }

    const episodeId = Number(req.params.id);
    const userId = req.user?.id;
    const { podcastId } = await episodeService.getById(episodeId);
    const podcast = await podcastService.getById(podcastId);

    if (podcast.type !== PodcastType.PRIVATE || podcast.userId === userId) {
      return next();
    }

    if (userId) {
      const isFolowed = await podcastFollowerService.checkIsFollowed({
        podcastId,
        followerId: userId,
      });

      if (isFolowed) {
        return next();
      }
    }

    next(new HttpError({
      status: HttpCode.FORBIDDEN,
      message: ErrorMessage.THIS_IS_A_PRIVATE_EPISODE,
    }));
  };

  return handler;
};

export { checkUserHasPermitToEpisode };

import {
  HttpCode,
  ErrorMessage,
  UserNotificationStatus,
  NotificationTitle,
  EpisodeType,
  UserRole,
} from '~/common/enums/enums';
import {
  Episode as TEpisode,
  EpisodeCreateDTOPayload,
  EpisodeCreatePayload,
  EpisodeEditPayload,
  EpisodeQueryPayload,
  LoadEpisodesByPodcastIdPayload,
  UserFavouriteEpisodeResponse,
  LoadFavouriteEpisodesPayload,
  EpisodeWithPodcast,
  User,
} from '~/common/types/types';
import { FileStorage } from '~/services/file-storage/file-storage.service';
import {
  episode as episodeRep,
  record as recordRep,
  image as imageRep,
  podcast as podcastRep,
  userNotification as userNotificationRep,
} from '~/data/repositories/repositories';
import {
  shownote,
  comment,
  record,
  image,
  podcastFollower,
  notification,
  userFavouriteEpisode,
} from '~/services/services';
import { HttpError } from '~/exceptions/exceptions';

type Constructor = {
  episodeRepository: typeof episodeRep;
  shownoteService: typeof shownote;
  imageRepository: typeof imageRep;
  recordRepository: typeof recordRep;
  podcastRepository: typeof podcastRep;
  userNotificationRepository: typeof userNotificationRep;
  fileStorage: FileStorage;
  commentService: typeof comment;
  recordService: typeof record;
  imageService: typeof image;
  podcastFollowerService: typeof podcastFollower;
  notificationService: typeof notification;
  userFavouriteEpisodeService: typeof userFavouriteEpisode;
};

class Episode {
  #episodeRepository: typeof episodeRep;
  #shownoteService: typeof shownote;
  #fileStorage: FileStorage;
  #recordRepository: typeof recordRep;
  #imageRepository: typeof imageRep;
  #podcastRepository: typeof podcastRep;
  #commentService: typeof comment;
  #recordService: typeof record;
  #imageService: typeof image;
  #userFavouriteEpisodeService: typeof userFavouriteEpisode;
  #podcastFollowerService: typeof podcastFollower;
  #notificationService: typeof notification;
  #userNotificationRepository: typeof userNotificationRep;

  constructor({
    episodeRepository,
    shownoteService,
    fileStorage,
    recordRepository,
    imageRepository,
    podcastRepository,
    commentService,
    recordService,
    imageService,
    podcastFollowerService,
    notificationService,
    userNotificationRepository,
    userFavouriteEpisodeService,
  }: Constructor) {
    this.#episodeRepository = episodeRepository;
    this.#shownoteService = shownoteService;
    this.#fileStorage = fileStorage;
    this.#recordRepository = recordRepository;
    this.#imageRepository = imageRepository;
    this.#podcastRepository = podcastRepository;
    this.#commentService = commentService;
    this.#recordService = recordService;
    this.#imageService = imageService;
    this.#podcastFollowerService = podcastFollowerService;
    this.#notificationService = notificationService;
    this.#userNotificationRepository = userNotificationRepository;
    this.#userFavouriteEpisodeService = userFavouriteEpisodeService;
  }

  public getAll(): Promise<TEpisode[]> {
    return this.#episodeRepository.getAll();
  }

  public getPopular(): Promise<TEpisode[]> {
    return this.#episodeRepository.getPopular();
  }

  public async getById(id: number): Promise<TEpisode> {
    const episode = await this.#episodeRepository.getById(id);
    if (!episode) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.EPISODE_NOT_FOUND,
      });
    }
    return episode;
  }

  public async create({
    userId,
    recordDataUrl,
    imageDataUrl,
    type,
    description,
    shownotes,
    name,
    podcastId,
    status,
  }: EpisodeCreatePayload): Promise<TEpisode> {
    const newEpisode: EpisodeCreateDTOPayload = {
      userId,
      type,
      description,
      name,
      podcastId,
      status,
      imageId: null,
    };

    if (imageDataUrl) {
      const { url, publicId } = await this.#fileStorage.upload({
        dataUrl: imageDataUrl,
        userId,
      });

      const image = await this.#imageRepository.create({
        url,
        publicId,
      });

      newEpisode.imageId = image.id;
    }

    const episode = await this.#episodeRepository.create(newEpisode);

    if (shownotes.length) {
      await this.#shownoteService.create(
        ...shownotes.map((shownote) => ({
          ...shownote,
          episodeId: episode.id,
        })),
      );
    }

    if (recordDataUrl) {
      const { url, publicId, bytes } = await this.#fileStorage.upload({
        dataUrl: recordDataUrl,
        userId,
      });

      await this.#recordRepository.create({
        fileUrl: url,
        publicId,
        episodeId: episode.id,
        fileSize: bytes,
      });
    }

    if (episode.type !== EpisodeType.UNLISTED) {
      const podcast = await this.#podcastRepository.getById(episode.podcastId);
      const notification = await this.#notificationService.create({
        title: NotificationTitle.NEW_EPISODE,
        message: `New episode "${episode.name}" released on podcast "${podcast.name}"`,
      });
      const podcastFollowers =
        await this.#podcastFollowerService.getAllByPodcastId(podcastId);

      await Promise.all(
        podcastFollowers.map((podcastFollower) => {
          return this.#userNotificationRepository.create({
            userId: podcastFollower.followerId,
            notificationId: notification.id,
            status: UserNotificationStatus.UNCHECKED,
          });
        }),
      );
    }

    return episode;
  }

  public async update(
    id: string,
    {
      recordDataUrl,
      imageDataUrl,
      type,
      description,
      shownotes,
      name,
      userId,
      imageId,
      status,
    }: EpisodeEditPayload,
  ): Promise<TEpisode> {
    const episodeId = Number(id);
    let newImageId: number | null = null;

    if (recordDataUrl) {
      const oldRecord = await this.#recordRepository.getByEpisodeId(episodeId);

      if (oldRecord) {
        await this.#fileStorage.delete(oldRecord.publicId);
        await this.#recordRepository.delete(oldRecord.id);
      }

      const { url, publicId, bytes } = await this.#fileStorage.upload({
        dataUrl: recordDataUrl,
        userId,
      });

      await this.#recordRepository.create({
        publicId,
        episodeId,
        fileUrl: url,
        fileSize: bytes,
      });
    }

    if (imageDataUrl) {
      const { url, publicId } = await this.#fileStorage.upload({
        dataUrl: imageDataUrl,
        userId,
      });

      const image = await this.#imageRepository.create({
        url,
        publicId,
      });

      newImageId = image.id;
    }

    await this.#shownoteService.deleteAllByEpisodeId(Number(id));

    if (shownotes.length) {
      await this.#shownoteService.create(
        ...shownotes.map((shownote) => ({
          ...shownote,
          episodeId: Number(id),
        })),
      );
    }

    const episode = await this.#episodeRepository.update(id, {
      name,
      description,
      type,
      status,
      imageId: newImageId ?? imageId,
    });

    if (imageDataUrl && imageId) {
      const oldImage = await this.#imageRepository.getById(imageId);

      await this.#imageRepository.delete(oldImage.id);
      await this.#fileStorage.delete(oldImage.publicId);
    }

    return episode;
  }

  public getEpisodeCountByPodcastId(isOwner: boolean, id: number): Promise<number> {
    return this.#episodeRepository.getEpisodeCountByPodcastId(isOwner, id);
  }

  public async getByQueryByPodcastId(
    user: User | undefined,
    loadEpisodesByPodcastIdPayload: LoadEpisodesByPodcastIdPayload,
  ): Promise<EpisodeQueryPayload> {
    const podcast = await this.#podcastRepository.getById(loadEpisodesByPodcastIdPayload.podcastId);

    const isOwner = user?.id === podcast.userId || user?.role === UserRole.MASTER;

    const results = await this.#episodeRepository.getByQueryByPodcastId(isOwner, loadEpisodesByPodcastIdPayload);
    const totalCount = await this.#episodeRepository.getEpisodeCountByPodcastId(isOwner, loadEpisodesByPodcastIdPayload.podcastId);

    return {
      results,
      totalCount,
    };
  }

  public async delete(id: number): Promise<TEpisode> {
    const episode = await this.#episodeRepository.getById(id);

    if (!episode) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.EPISODE_NOT_FOUND,
      });
    }

    const favoriteEpisodes = await this.#userFavouriteEpisodeService.getAllByEpisodeId(id);
    const hasFavoriteEpisodes = Boolean(favoriteEpisodes.length);
    if(hasFavoriteEpisodes){
      await this.#userFavouriteEpisodeService.deleteAllByEpisodeId(id);
    }

    const comments = await this.#commentService.getAllByEpisodeId(episode.id);
    const hasComments = Boolean(comments.length);
    if (hasComments) {
      await Promise.all(comments.map((comment) => this.#commentService.delete(comment.id)));
    }

    const record = await this.#recordService.getByEpisodeId(id);
    if (record) {
      await this.#recordService.delete(record.id);
    }

    await this.#shownoteService.deleteAllByEpisodeId(id);

    await this.#episodeRepository.delete(id);

    if (episode.imageId) {
      await this.#imageService.delete(episode.imageId);
    }

    return episode;
  }

  public async deleteAllByPodcastId(id: number): Promise<void> {
    const episodes = await this.#episodeRepository.getAllByPodcastId(id);
    await Promise.all(episodes.map((episode) => this.delete(episode.id)));
  }

  public async getFavouriteByQueryByUserId(payload: LoadFavouriteEpisodesPayload): Promise<UserFavouriteEpisodeResponse> {
    const episodes = await this.#episodeRepository.getFavouriteByQueryByUserId(payload);
    const totalCount = await this.#episodeRepository.getFavouriteCountByUserId(payload.userId);

    return {
      episodes,
      totalCount,
    };
  }

  public async getAllByPLaylistId(playlistId: number): Promise<EpisodeWithPodcast[]> {
    const episodes = await this.#episodeRepository.getAllByPLaylistId(playlistId);
    return episodes;
  }
}

export { Episode };

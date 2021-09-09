import { HttpCode, PodcastType, ErrorMessage } from '~/common/enums/enums';
import {
  Podcast as TPodcast,
  PodcastCreateDTOPayload,
  PodcastEditDTOPayload,
  PodcastCreatePayload,
  PodcastEditPayload,
  UserPodcastQueryParams,
  PodcastLoadFilter,
  PodcastQueryPayload,
} from '~/common/types/types';
import {
  podcast as podcastRep,
  image as imageRep,
  invitationCode as invitationCodeRep,
} from '~/data/repositories/repositories';
import { FileStorage } from '~/services/file-storage/file-storage.service';
import { HttpError } from '~/exceptions/exceptions';
import { image, episode, podcastFollower } from '~/services/services';

type Constructor = {
  podcastRepository: typeof podcastRep;
  imageRepository: typeof imageRep;
  invitationCodeRepository: typeof invitationCodeRep;
  fileStorage: FileStorage;
  imageService: typeof image;
  episodeService: typeof episode;
  podcastFollowerService: typeof podcastFollower;
};

class Podcast {
  #podcastRepository: typeof podcastRep;
  #imageRepository: typeof imageRep;
  #invitationCodeRepository: typeof invitationCodeRep;
  #fileStorage: FileStorage;
  #imageService: typeof image;
  #episodeService: typeof episode;
  #podcastFollowerService: typeof podcastFollower;

  constructor({
    podcastRepository,
    imageRepository,
    invitationCodeRepository,
    fileStorage,
    imageService,
    episodeService,
    podcastFollowerService,
  }: Constructor) {
    this.#podcastRepository = podcastRepository;
    this.#imageRepository = imageRepository;
    this.#fileStorage = fileStorage;
    this.#imageService = imageService;
    this.#episodeService = episodeService;
    this.#invitationCodeRepository = invitationCodeRepository;
    this.#podcastFollowerService = podcastFollowerService;
  }

  public async getByQuery(filter: PodcastLoadFilter): Promise<PodcastQueryPayload> {
    const [podcasts, totalPagesCount] = await Promise.all([
      this.#podcastRepository.getByQuery(filter),
      this.#podcastRepository.getPodcastsPagesCount(filter),
    ]);
    return {
      results: podcasts,
      totalPagesCount: totalPagesCount,
    };
  }

  public getPopular(): Promise<TPodcast[]> {
    return this.#podcastRepository.getPopular();
  }

  public async create({
    name,
    userId,
    description,
    imageDataUrl,
    coverDataUrl,
    type,
    genreId,
    periodicity,
    invitationCode,
  }: PodcastCreatePayload): Promise<TPodcast> {
    const newPodcast: PodcastCreateDTOPayload = {
      name,
      userId,
      description,
      imageId: null,
      coverId: null,
      type,
      genreId,
      periodicity,
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

      newPodcast.imageId = image.id;
    }

    if (coverDataUrl) {
      const { url, publicId } = await this.#fileStorage.upload({
        dataUrl: coverDataUrl,
        userId,
      });

      const image = await this.#imageRepository.create({
        url,
        publicId,
      });

      newPodcast.coverId = image.id;
    }

    const podcast = await this.#podcastRepository.create(newPodcast);

    if (invitationCode) {
      await this.#invitationCodeRepository.create({
        podcastId: podcast.id,
        code: invitationCode,
      });
    }

    return podcast;
  }

  public async getById(id: number): Promise<TPodcast> {
    const podcast = await this.#podcastRepository.getById(id);

    if (!podcast) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.PODCAST_NOT_FOUND,
      });
    }
    return podcast;
  }

  public async update(
    id: string,
    {
      name,
      type,
      userId,
      description,
      imageId,
      imageDataUrl,
      coverDataUrl,
      coverId,
      genreId,
      periodicity,
      invitationCode,
    }: PodcastEditPayload,
  ): Promise<TPodcast> {
    const updatePodcast: PodcastEditDTOPayload = {
      name,
      type,
      description,
      imageId: imageId,
      coverId: coverId,
      genreId,
      periodicity,
    };

    let deleteImageId: number | null = null;
    let deleteCoverId: number | null = null;

    if (imageDataUrl) {
      const { url, publicId } = await this.#fileStorage.upload({
        dataUrl: imageDataUrl,
        userId,
      });

      deleteImageId = imageId;

      const image = await this.#imageRepository.create({
        url,
        publicId,
      });

      updatePodcast.imageId = image.id;
    }

    if (coverDataUrl) {
      const { url, publicId } = await this.#fileStorage.upload({
        dataUrl: coverDataUrl,
        userId,
      });

      deleteCoverId = coverId;

      const image = await this.#imageRepository.create({
        url,
        publicId,
      });

      updatePodcast.coverId = image.id;
    }

    const podcast = await this.#podcastRepository.update(id, updatePodcast);

    if (deleteImageId) {
      const { publicId } = await this.#imageRepository.getById(deleteImageId);
      await this.#fileStorage.delete(publicId);
      await this.#imageRepository.delete(deleteImageId);
    }

    if (deleteCoverId) {
      const { publicId } = await this.#imageRepository.getById(deleteCoverId);
      await this.#fileStorage.delete(publicId);
      await this.#imageRepository.delete(deleteCoverId);
    }

    if (invitationCode) {
      const hasInvitationCode = await this.#invitationCodeRepository.getByPodcastId(podcast.id);

      hasInvitationCode ?
        await this.#invitationCodeRepository.update({
          podcastId: Number(id),
          code: invitationCode,
        })
        : await this.#invitationCodeRepository.create({
          podcastId: Number(id),
          code: invitationCode,
        });
    }

    return podcast;
  }

  public getAllByUserId(
    searchedUserId: number,
    requestUserId?: number,
  ): Promise<TPodcast[]> {
    const filterParams: UserPodcastQueryParams = {
      user_id: searchedUserId,
    };
    const isRequestUserAuthorised = Boolean(requestUserId);

    if (!isRequestUserAuthorised || searchedUserId !== requestUserId) {
      filterParams.type = PodcastType.PUBLIC;
    }

    return this.#podcastRepository.getAllByUserId(filterParams);
  }

  public async delete(id: number): Promise<TPodcast> {
    const podcast = await this.#podcastRepository.getById(id);

    if (!podcast) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.PODCAST_NOT_FOUND,
      });
    }

    const episodes = await this.#episodeService.getEpisodeCountByPodcastId(true, id);
    const isEpisodesExist = Boolean(episodes);

    if (isEpisodesExist) {
      await this.#episodeService.deleteAllByPodcastId(id);
    }

    const countFollowers = await this.#podcastFollowerService.getCountByPodcastId(id);

    if(countFollowers) {
      await this.#podcastFollowerService.deleteAllByPodcastId(id);
    }

    await this.#invitationCodeRepository.delete(id);

    await this.#podcastRepository.delete(id);

    if (podcast.imageId) {
      await this.#imageService.delete(podcast.imageId);
    }

    if (podcast.coverId) {
      await this.#imageService.delete(podcast.coverId);
    }

    return podcast;
  }

  public async invite(code: string, userId: number): Promise<TPodcast> {
    const invitationCode = await this.#invitationCodeRepository.getByCode(code);

    if (!invitationCode) {
      throw new HttpError({
        status: HttpCode.BAD_REQUEST,
        message: ErrorMessage.PODCAST_NOT_FOUND,
      });
    }

    await this.#podcastFollowerService.create({
      podcastId: invitationCode.podcastId,
      followerId: userId,
    });

    return this.#podcastRepository.getById(invitationCode.podcastId);
  }

  public async getInvitationCodeById(id: number): Promise<string> {
    const invitationCode = await this.#invitationCodeRepository.getByPodcastId(id);

    if (!invitationCode) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.INVITATION_CODE_DOES_NOT_EXIST,
      });
    }

    return invitationCode.code;
  }
}

export { Podcast };

import { HttpCode, PodcastType, ErrorMessage } from '~/common/enums/enums';
import {
  Podcast as TPodcast,
  PodcastCreateDTOPayload,
  PodcastEditDTOPayload,
  PodcastCreatePayload,
  PodcastEditPayload,
  PodcastSearchPayload,
  UserPodcastQueryParams,
  PodcastLoadFilter,
} from '~/common/types/types';
import { PODCAST_LOAD_LIMIT } from '~/common/constants/constants';
import {
  podcast as podcastRep,
  image as imageRep,
} from '~/data/repositories/repositories';
import { FileStorage } from '~/services/file-storage/file-storage.service';
import { HttpError } from '~/exceptions/exceptions';
import { image, episode } from '~/services/services';

type Constructor = {
  podcastRepository: typeof podcastRep;
  imageRepository: typeof imageRep;
  fileStorage: FileStorage;
  imageService: typeof image;
  episodeService: typeof episode;
};

class Podcast {
  #podcastRepository: typeof podcastRep;
  #imageRepository: typeof imageRep;
  #fileStorage: FileStorage;
  #imageService: typeof image;
  #episodeService: typeof episode;

  constructor({
    podcastRepository,
    imageRepository,
    fileStorage,
    imageService,
    episodeService,
  }: Constructor) {
    this.#podcastRepository = podcastRepository;
    this.#imageRepository = imageRepository;
    this.#fileStorage = fileStorage;
    this.#imageService = imageService;
    this.#episodeService = episodeService;
  }

  public getAll(filter: PodcastLoadFilter = { offset: 0, limit: PODCAST_LOAD_LIMIT }): Promise<TPodcast[]> {
    return this.#podcastRepository.getAll(filter);
  }

  public async create({
    name,
    userId,
    description,
    imageDataUrl,
    coverDataUrl,
    type,
    genreId,
  }: PodcastCreatePayload): Promise<TPodcast> {
    const newPodcast: PodcastCreateDTOPayload = {
      name,
      userId,
      description,
      imageId: null,
      coverId: null,
      type,
      genreId,
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

    return this.#podcastRepository.create(newPodcast);
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

  public getAllBySearch(payload: PodcastSearchPayload): Promise<TPodcast[]> {
    return this.#podcastRepository.getAllBySearch(payload);
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
    }: PodcastEditPayload,
  ): Promise<TPodcast> {
    const updatePodcast: PodcastEditDTOPayload = {
      name,
      type,
      description,
      imageId: imageId,
      coverId: coverId,
      genreId,
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

    const episodes = await this.#episodeService.getAllByPodcastId(id);
    const isEpisodesExist = Boolean(episodes);

    if (isEpisodesExist) {
      await this.#episodeService.deleteAllByPodcastId(id);
    }

    await this.#podcastRepository.delete(id);

    if (podcast.imageId) {
      await this.#imageService.delete(podcast.imageId);
    }

    if (podcast.coverId) {
      await this.#imageService.delete(podcast.coverId);
    }

    return podcast;
  }
}

export { Podcast };

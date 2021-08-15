import {
  Podcast as TPodcast,
  PodcastCreateDTOPayload,
  PodcastEditDTOPayload,
  PodcastCreatePayload,
  PodcastEditPayload,
} from '~/common/types/types';
import {
  podcast as podcastRep,
  image as imageRep,
} from '~/data/repositories/repositories';
import { FileStorage } from '~/services/file-storage/file-storage.service';
import { HttpError } from '~/exceptions/exceptions';
import { HttpCode, PodcastType } from '~/common/enums/enums';
import { ErrorMessage } from '~/common/enums/app/error-message.enum';

type Constructor = {
  podcastRepository: typeof podcastRep;
  imageRepository: typeof imageRep;
  fileStorage: FileStorage;
};

class Podcast {
  #podcastRepository: typeof podcastRep;
  #imageRepository: typeof imageRep;
  #fileStorage: FileStorage;

  constructor({
    podcastRepository,
    imageRepository,
    fileStorage,
  }: Constructor) {
    this.#podcastRepository = podcastRepository;
    this.#imageRepository = imageRepository;
    this.#fileStorage = fileStorage;
  }

  public getAll(): Promise<TPodcast[]> {
    return this.#podcastRepository.getAll();
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

  public async getById(id: string): Promise<TPodcast> {
    const podcast = await this.#podcastRepository.getById(id);
    if (!podcast) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.PODCAST_NOT_FOUND,
      });
    }
    return podcast;
  }

  public async update(id: string, {
    name,
    type,
    userId,
    description,
    imageId,
    imageDataUrl,
    coverDataUrl,
    coverId,
    genreId,
  }: PodcastEditPayload): Promise<TPodcast> {

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

  public getAllByUserId(searchedUserId: number, requestUserId: number | undefined): Promise<TPodcast[]> {
    const filterParams = {
      user_id: searchedUserId,
    };
    const isRequestUserAuthorised = Boolean(requestUserId);

    if (!isRequestUserAuthorised || searchedUserId !== requestUserId) {
      Object.assign(filterParams, { type: PodcastType.PUBLIC });
    }

    return this.#podcastRepository.getAllByUserId(filterParams);
  }
}

export { Podcast };

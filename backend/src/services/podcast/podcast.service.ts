import { HttpCode, ErrorMessage } from '~/common/enums/enums';
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

  public getAll(): Promise<TPodcast[]> {
    return this.#podcastRepository.getAll();
  }

  public async create({
    name,
    userId,
    description,
    imageDataUrl,
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

  public async update(id: string, {
    name,
    type,
    userId,
    description,
    imageId,
    imageDataUrl,
    genreId,
  }: PodcastEditPayload): Promise<TPodcast> {

    const updatePodcast: PodcastEditDTOPayload = {
      name,
      type,
      description,
      imageId: imageId,
      genreId,
    };

    let deleteImageId: number | null = null;

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

    const podcast = await this.#podcastRepository.update(id, updatePodcast);

    if (deleteImageId) {
      const { publicId } = await this.#imageRepository.getById(deleteImageId);
      await this.#fileStorage.delete(publicId);
      await this.#imageRepository.delete(deleteImageId);
    }

    return podcast;
  }

  public getAllByUserId(userId: string): Promise<TPodcast[]> {
    return this.#podcastRepository.getAllByUserId(userId);
  }

  public async delete(id: number): Promise<TPodcast> {
    const podcast = await this.#podcastRepository.getById(id);

    if (!podcast) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.PODCAST_NOT_FOUND,
      });
    }

    await this.#episodeService.deleteAllByPodcastId(id);

    if (podcast.imageId) {
      await this.#imageService.delete(podcast.imageId);
    }

    await this.#podcastRepository.delete(id);

    return podcast;
  }
}

export { Podcast };

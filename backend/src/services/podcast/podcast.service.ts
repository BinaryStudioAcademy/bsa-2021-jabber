import {
  Podcast as TPodcast,
  PodcastCreatePayload,
} from '~/common/types/types';
import {
  podcast as podcastRep,
  image as imageRep,
} from '~/data/repositories/repositories';
import { FileStorage } from '~/services/file-storage/file-storage.service';
import { HttpError } from '~/exceptions/exceptions';
import { HttpCode } from '~/common/enums/enums';
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
    imgDataUrl,
  }: PodcastCreatePayload): Promise<TPodcast> {
    let imageId = null;

    if (imgDataUrl) {
      const { url, publicId } = await this.#fileStorage.upload({
        dataUrl: imgDataUrl,
        userId,
      });

      const imagePayload = { url, publicId };

      const image = await this.#imageRepository.create(imagePayload);

      imageId = image.id;
    }

    const podcastPayload = {
      name,
      userId,
      imageId,
      description,
    };

    return this.#podcastRepository.create(podcastPayload);
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
}

export { Podcast };

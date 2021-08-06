import {
  Podcast as TPodcast,
  PodcastCreateDTOPayload,
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
    imageDataUrl,
    type,
  }: PodcastCreatePayload): Promise<TPodcast> {
    const newPodcast: PodcastCreateDTOPayload = {
      name,
      userId,
      description,
      imageId: null,
      type,
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

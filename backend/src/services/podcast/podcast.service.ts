import {
  Podcast as TPodcast,
  PodcastCreatePayload,
} from '~/common/types/types';
import {
  podcast as podcastRep,
  image as imageRep,
} from '~/data/repositories/repositories';
import { FileStorage } from '~/services/file-storage/file-storage.service';

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
}

export { Podcast };

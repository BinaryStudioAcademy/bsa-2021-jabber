import { HttpCode } from '~/common/enums/enums';
import {
  Episode as TEpisode,
  EpisodeCreateDTOPayload,
  EpisodeCreatePayload,
} from '~/common/types/types';
import {
  episode as episodeRep,
  image as imageRep,
} from '~/data/repositories/repositories';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage } from '~/common/enums/enums';
import { FileStorage } from '~/services/file-storage/file-storage.service';

type Constructor = {
  episodeRepository: typeof episodeRep;
  imageRepository: typeof imageRep;
  fileStorage: FileStorage;
};

class Episode {
  #episodeRepository: typeof episodeRep;
  #imageRepository: typeof imageRep;
  #fileStorage: FileStorage;

  constructor({
    episodeRepository,
    imageRepository,
    fileStorage,
  }: Constructor) {
    this.#episodeRepository = episodeRepository;
    this.#imageRepository = imageRepository;
    this.#fileStorage = fileStorage;
  }

  public getAll(): Promise<TEpisode[]> {
    return this.#episodeRepository.getAll();
  }

  public async getById(id: string): Promise<TEpisode> {
    const episode = await this.#episodeRepository.getById(id);
    if (!episode) {
      throw new HttpError({
        status: HttpCode.NOT_FOUND,
        message: ErrorMessage.NOT_FOUND,
      });
    }
    return episode;
  }

  public async create({
    name,
    userId,
    podcastId,
    description,
    imageDataUrl,
    type,
  }: EpisodeCreatePayload): Promise<TEpisode> {
    const newEpisode: EpisodeCreateDTOPayload = {
      name,
      type,
      userId,
      podcastId,
      description,
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

    return this.#episodeRepository.create(newEpisode);
  }
}

export { Episode };

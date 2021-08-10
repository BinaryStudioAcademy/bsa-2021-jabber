import { HttpCode } from '~/common/enums/enums';
import {
  Episode as TEpisode,
  EpisodeCreateDTOPayload,
  EpisodeCreatePayload,
} from '~/common/types/types';
import { FileStorage } from '~/services/file-storage/file-storage.service';
import {
  episode as episodeRep,
  record as recordRep,
  image as imageRep,
  podcast as podcastRep,
} from '~/data/repositories/repositories';
import { shownote } from '~/services/services';
import { HttpError } from '~/exceptions/exceptions';
import { ErrorMessage } from '~/common/enums/enums';

type Constructor = {
  episodeRepository: typeof episodeRep;
  shownoteService: typeof shownote;
  imageRepository: typeof imageRep;
  recordRepository: typeof recordRep;
  fileStorage: FileStorage;
  podcastRepository: typeof podcastRep;
};

class Episode {
  #episodeRepository: typeof episodeRep;
  #shownoteService: typeof shownote;
  #fileStorage: FileStorage;
  #recordRepository: typeof recordRep;
  #imageRepository: typeof imageRep;
  #podcastRepository: typeof podcastRep;

  constructor({
    episodeRepository,
    shownoteService,
    fileStorage,
    recordRepository,
    imageRepository,
  }: Constructor) {

    this.#episodeRepository = episodeRepository;
    this.#shownoteService = shownoteService;
    this.#fileStorage = fileStorage;
    this.#recordRepository = recordRepository;
    this.#imageRepository = imageRepository;
    this.#podcastRepository = podcastRepository;
  }

  public getAll(): Promise<TEpisode[]> {
    return this.#episodeRepository.getAll();
  }

  public async getById(id: string): Promise<TEpisode> {
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

    await this.#shownoteService.create(
      ...shownotes.map((shownote) => ({
        ...shownote,
        episodeId: episode.id,
      })),
    );

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

    return episode;
  }

  public getAllByPodcastId(id: string): Promise<TEpisode[]> {
    return this.#episodeRepository.getAllByPodcastId(id);
  }
}

export { Episode };
